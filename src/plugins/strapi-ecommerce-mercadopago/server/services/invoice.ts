/**
 *  service
 */

import { factories } from "@strapi/strapi";
import { INVOICES_STATUS } from "../../constants";
import { errors } from "@strapi/utils";
import { productsPricesSummary } from "../../helpers";
import type { buildedProduct, shipping, buyer } from "../../types";

export default factories.createCoreService(
  "plugin::strapi-ecommerce-mercadopago.invoice",
  ({ strapi }) => ({
    async createInitialInvoice({
      shipping,
      buyer,
      products,
    }: {
      shipping: shipping;
      buyer: buyer;
      products: buildedProduct[];
    }) {
      const { afterDiscountPrice } = productsPricesSummary(products);

      try {
        const savedata = await strapi
          .query("plugin::strapi-ecommerce-mercadopago.invoice")
          .create({
            data: {
              status: INVOICES_STATUS.INIT,
              buyer_email: "demo@demo.com",
              total: afterDiscountPrice,
            },
          });

        return savedata;
      } catch (error) {
        throw new errors.ApplicationError(error.message, {
          service: "createInitialInvoice",
        });
      }
    },
  })
);
