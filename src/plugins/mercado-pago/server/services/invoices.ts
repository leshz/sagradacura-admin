import { Strapi } from "@strapi/strapi";
import type { invoiceType } from "../types/types";

export default ({ strapi }: { strapi: Strapi }) => ({
  createInvoice: async (invoice: invoiceType) => {
    try {
      const savedata = await strapi
        .query("plugin::mercado-pago.invoice")
        .create({
          data: {
            ...invoice,
          },
        });

      return savedata;
    } catch (error) {
      console.log(error.message);
      console.log("service");
    }
  },
});
