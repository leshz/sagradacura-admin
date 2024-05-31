/**
 *  service
 */

import { factories } from "@strapi/strapi";
import { INVOICES_STATUS } from "../../constants";
import { errors } from "@strapi/utils";
import type { buildedProduct, shipping, buyer } from "../../types";

const getTotalInvoice = (products: buildedProduct[]) => {
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.unit_price * product.quantity;
  }, 0);
  return totalPrice;
};

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
      let extra = {};
      if (products.length) {
        extra = {
          products,
          total_invoice: getTotalInvoice(products),
        };
      }
      try {
        const savedata = await strapi
          .query("plugin::strapi-ecommerce-mercadopago.invoice")
          .create({
            data: {
              status: INVOICES_STATUS.INIT,
              buyer_email: "demo@demo.com",
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
