import { Strapi } from "@strapi/strapi";
import {
  INVOICES_STATUS,
  MERCADOPAGO_TOPIC,
  MERCADOPAGO_MERCHAN_STATUS,
} from "../../constants/constants";

export default ({ strapi }: { strapi: Strapi }) => ({
  async ipn(ctx, next) {
    try {
      const { platfromId = "", id = "" } = ctx.query;
      const { topic } = ctx.request.body || {};
      if (platfromId === "") return ctx.badRequest("bad request");

      const platformInfo = await strapi
        .plugin("payments")
        .service("utils")
        .getPlatform(platfromId);

      if (MERCADOPAGO_TOPIC.MERCHANT_ORDER === topic) {
        const order = await strapi
          .plugin("payments")
          .service("mercadopago")
          .getMerchantOrder({ id, platform: platformInfo });

        const { external_reference, status, payments = [] } = order;

        const { status: lastStatus } = payments[payments.length - 1];

        const approvedPayment = payments.some(
          ({ status = "" }) => status === INVOICES_STATUS.APPROVED
        );

        if (MERCADOPAGO_MERCHAN_STATUS.CLOSED === status && approvedPayment) {
          await strapi
            .plugin("payments")
            .service("invoice")
            .updateInvoice({
              invoiceId: external_reference,
              data: {
                status: INVOICES_STATUS.APPROVED,
                payment_status: lastStatus,
              },
            });
        } else {
          await strapi
            .plugin("payments")
            .service("invoice")
            .updateInvoice({
              invoiceId: external_reference,
              data: {
                payment_status: lastStatus,
              },
            });
        }
      }
      return ctx.send("ok");
    } catch (error) {
      return ctx.internalServerError(error.message, {
        controller: "IPN",
      });
    }
  },
});
