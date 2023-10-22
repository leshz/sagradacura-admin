import { Strapi } from "@strapi/strapi";
import { v4 as uuidv4 } from "uuid";
import utils from "@strapi/utils";
import { INVOICES_STATUS } from "../../constants/constants";
import type { confirmationQuery } from "../../types/types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkout(ctx, next) {
    const { platform } = ctx.state;
    const { items = [], buyer = {} } = ctx.request.body || {};
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await strapi
      .plugin("payments")
      .service("utils")
      .buildItems(items, platform);

    // TODO: Definir la informacion del bayer
    const personalInfo = await strapi
      .plugin("payments")
      .service("utils")
      .buildBuyer(buyer);

    // TODO: build shipping
    // const shippingInfo = await strapi
    //   .plugin("mercado-pago")
    //   .service("helpers")
    //   .buildMeliShipping(shipping);

    try {
      let invoice = await strapi
        .plugin("payments")
        .service("invoice")
        .createInitialInvoice({ platform, buyer: personalInfo, products });

      if (!invoice) {
        return ctx.internalServerError("Creating invoice Error", {
          controller: "createInvoice",
        });
      }

      const preference = await strapi
        .plugin("payments")
        .service("mercadopago")
        .createPreference({
          invoiceId: invoice.id,
          products,
          payer: personalInfo,
          platform,
          internalInvoiceId: invoice.id,
        });

      const { id, collector_id, init_point, metadata } = preference;
      console.log({ id, collector_id, init_point, metadata }, "results");

      invoice = await strapi
        .plugin("payments")
        .service("invoice")
        .updateInvoice({
          invoiceId: invoice.id,
          data: {
            metadata,
            status: INVOICES_STATUS.IN_PROCESS,
            collectorId: collector_id,
            preferenceId: id,
          },
        });

      return ctx.send({ init_point, preferenceId: id, invoiceId: invoice.id });
    } catch (error) {
      return ctx.internalServerError(error, {
        controller: "checkout",
      });
    }
  },
  // async confirmationProcess(ctx, next) {
  //   console.log("confirmationProcess");

  //   try {
  //     const {
  //       sanitize: { contentAPI },
  //     } = utils;
  //     // const body: confirmationQuery = await contentAPI.query(ctx.body);
  //     const body: confirmationQuery = ctx.body;

  //     console.log(JSON.stringify(ctx.request.body));

  //     // const savedata = await strapi.db
  //     //   .query("plugin::mercado-pago.invoice")
  //     //   .findOne({
  //     //     select: ["*"],
  //     //     where: { paymentId: sanitizeQuery.external_reference },
  //     //   });
  //     //TODO Covertir funcion a servicio
  //     // if (savedata.status === INVOICES_STATUS.IN_PROCESS) {
  //     //   const updateData = await strapi.db
  //     //     .query("plugin::mercado-pago.invoice")
  //     //     .update({
  //     //       where: { paymentId: sanitizeQuery.external_reference },
  //     //       data: {
  //     //         status: sanitizeQuery.status,
  //     //         paidWith: sanitizeQuery.payment_type,
  //     //       },
  //     //     });
  //     //   return (ctx.body = await contentAPI.output(updateData));
  //     // }
  //     // return await contentAPI.output("ok");
  //     return "ok";
  //   } catch (error) {
  //     console.log(error);

  //     return ctx.internalServerError(error.message, {
  //       controller: "checkoutProcess",
  //     });
  //   }
  // },
  async checkoutNotification(ctx, next) {},
});
