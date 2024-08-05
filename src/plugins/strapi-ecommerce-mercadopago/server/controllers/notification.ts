/**
 *  controller
 */
import { NOTIFICATION_TYPES } from "../../constants";
import type { Strapi } from "@strapi/strapi";
import type { config } from "../../types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async notification(ctx) {
    const payload = ctx?.request?.body || {};
    const { config }: { config: config } = ctx.state;
    const { type = "", action = "" } = payload;

    strapi.log.info("Notification activated!");

    switch (type) {
      case NOTIFICATION_TYPES.PAYMENT:
        strapi.log.info("Payment Action");
        await strapi
          .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
          .paymentHook(payload, config);
        return ctx.send();

      default:
        strapi.log.info(`Meli Webhook type: ${type}`);
        strapi.log.info(`Meli Webhook action: ${action}`);
        return ctx.send();
    }
  },
});
