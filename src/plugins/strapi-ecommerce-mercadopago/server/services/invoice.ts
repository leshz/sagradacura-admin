/**
 *  service
 */

import { factories } from "@strapi/strapi";
import { INVOICES_STATUS, SHIPPING_STATUS } from "../../constants";
import { errors } from "@strapi/utils";
import { productsPricesSummary } from "../../helpers";
import type { buildedProduct, Reqbuyer, Reqship, config } from "../../types";

export default factories.createCoreService(
  "plugin::strapi-ecommerce-mercadopago.invoice",
  ({ strapi }) => ({
    async createInitialInvoice({
      shipping,
      products,
      shopper,
      config,
    }: {
      shipping: Reqship;
      shopper: Reqbuyer;
      products: buildedProduct[];
      config: config;
    }) {
      try {
        const formatedProducts = await strapi
          .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
          .meliProduct(products, config);
        const { total, totalDiscounted } = productsPricesSummary(products);
        const savedata = await strapi?.entityService?.create(
          "plugin::strapi-ecommerce-mercadopago.invoice",
          {
            data: {
              payment_status: INVOICES_STATUS.INITIAL,
              total: total,
              total_discount: totalDiscounted,
              products: formatedProducts,
              shipping_status: SHIPPING_STATUS.INITIAL,
              shopper: { ...shopper, last_name: shopper.lastName },
              shipping: { ...shipping, postal_code: shipping.postalCode || 0 },
            },
          }
        );
        return savedata;
      } catch (error) {
        throw new errors.ApplicationError(error.message, {
          service: "createInitialInvoice",
        });
      }
    },
    updateInvoice: async ({ id, data }) => {
      try {
        const savedata = await strapi.entityService?.update(
          "plugin::strapi-ecommerce-mercadopago.invoice",
          id,
          { data }
        );
        return savedata;
      } catch (error) {
        throw new errors.ApplicationError(error.message, {
          service: "updateInvoice",
        });
      }
    },
  })
);
