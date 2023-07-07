import { Strapi } from "@strapi/strapi";
import { v4 as uuidv4 } from "uuid";
import utils from "@strapi/utils";
import { INVOICES_STATUS } from "../constants/constants";
import type { confirmationQuery } from "../types/types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkoutProcess(ctx, next) {
    const {
      sanitize: { contentAPI },
    } = utils;
    const { platform } = ctx.state;
    const sanitizeBody = await contentAPI.query(ctx.request.body);
    const { items = [], payer = {}, shipping = {} } = sanitizeBody;
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildIMelitems(items);

    // TODO: build buyer info
    const payerInfo = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildMeliPayer(payer);

    // TODO: build shipping
    const shippingInfo = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildMeliShipping(shipping);

    try {
      const invoiceId = uuidv4();
      const preference = await strapi
        .plugin("mercado-pago")
        .service("preferences")
        .createPreference({
          platform,
          items: products,
          // payerInfo,
          internalInvoiceId: invoiceId,
        });
      const { id, collector_id, init_point } = preference;
      //TODO: Calcular la factura y los precios de los productos
      const savedata = await strapi
        .plugin("mercado-pago")
        .service("invoices")
        .createInvoice({
          paymentId: invoiceId,
          status: INVOICES_STATUS.IN_PROCESS,
          netPrice: 0,
          totalPrice: 0,
          preference_id: id,
          collectorId: collector_id,
          metadata: preference,
        });

      if (!savedata) {
        return ctx.internalServerError("Creating invoice Error", {
          controller: "createInvoice",
        });
      }

      const data = { invoiceId: invoiceId, init_point };
      ctx.body = await contentAPI.output(data);
    } catch (error) {
      return ctx.internalServerError(error.message, {
        controller: "checkoutProcess",
      });
    }
  },
  async confirmationProcess(ctx, next) {
    try {
      const {
        sanitize: { contentAPI },
      } = utils;
      const sanitizeQuery: confirmationQuery = await contentAPI.query(
        ctx.query
      );

      const savedata = await strapi.db
        .query("plugin::mercado-pago.invoice")
        .findOne({
          select: ["*"],
          where: { paymentId: sanitizeQuery.external_reference },
        });
      //TODO Covertir funcion a servicio
      if (savedata.status === INVOICES_STATUS.IN_PROCESS) {
        const updateData = await strapi.db
          .query("plugin::mercado-pago.invoice")
          .update({
            where: { paymentId: sanitizeQuery.external_reference },
            data: {
              status: sanitizeQuery.status,
              paidWith: sanitizeQuery.payment_type,
            },
          });
        return (ctx.body = await contentAPI.output(updateData));
      }
      return await contentAPI.output(savedata);
    } catch (error) {
      return ctx.internalServerError(error.message, {
        controller: "checkoutProcess",
      });
    }
  },
  async checkoutNotification(ctx, next) {},
});
