/**
 *  controller
 */

import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkout(ctx) {
    ctx.send("ok");
  },
});
