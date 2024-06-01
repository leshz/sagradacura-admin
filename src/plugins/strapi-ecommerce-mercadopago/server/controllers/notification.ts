/**
 *  controller
 */

import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async notification(ctx) {
    ctx.send("confirm");
  },
});
