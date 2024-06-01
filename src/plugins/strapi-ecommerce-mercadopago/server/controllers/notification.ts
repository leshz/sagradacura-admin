/**
 *  controller
 */
import { NOTIFICATION_TYPES } from "../../constants";
import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async notification(ctx) {
    const {
      type,
      data,
      user_id: collector_id,
      action,
    } = ctx?.request?.body || {};

    switch (type) {
      case NOTIFICATION_TYPES.PAYMENT:
        //TODO write the confirmation method here
        break;

      default:
        ctx.send("confirm");
        break;
    }
  },
});
