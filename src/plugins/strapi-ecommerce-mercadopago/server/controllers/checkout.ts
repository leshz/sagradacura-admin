/**
 *  controller
 */

import type { Strapi } from "@strapi/strapi";
import type { config, buyerMeli, request } from "../../types";
import { INVOICES_STATUS } from "../../constants";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkout(ctx, next) {
    const { config }: { config: config } = ctx.state;

    //TODO : Add validation

    const { items, buyer, ship }: request = ctx.request.body || {};
    if (items.length === 0) return ctx.badRequest();

    try {
      const products = await strapi
        .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
        .products(items, config);

      const buyerData: buyerMeli = await strapi
        .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
        .buyer(buyer, ship);

      const initInvoice = await strapi
        .service("plugin::strapi-ecommerce-mercadopago.invoice")
        .createInitialInvoice({
          shipping: ship,
          shopper: buyer,
          products,
          config
        });

      // if (!initInvoice) {
      //   ctx.internalServerError("Creating invoice Error", {
      //     controller: "createInvoice",
      //   });
      // }

      // const preference = await strapi
      //   .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
      //   .createPreference(
      //     {
      //       products,
      //       payer: buyerData,
      //       internalInvoiceId: initInvoice.id,
      //     },
      //     config
      //   );

      // const { id, collector_id, init_point } = preference;

      // const updatedInvoice = await strapi
      //   .service("plugin::strapi-ecommerce-mercadopago.invoice")
      //   .updateInvoice({
      //     invoiceId: initInvoice.id,
      //     data: {
      //       status: INVOICES_STATUS.IN_PROCESS,
      //       collector_id: collector_id,
      //       preference_id: id,
      //     },
      //   });
      return ctx.send();
      // return ctx.send({
      //   init_point,
      //   preferenceId: id,
      //   invoiceId: updatedInvoice.id,
      // });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError({error});
    }
  },
});
