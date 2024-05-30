/**
 *  controller
 */

import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async confirmation(ctx) {
    ctx.send("confirm");
  },
});
