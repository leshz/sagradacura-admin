/**
 *  controller
 */

import * as util from "util";

import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async confirmation(ctx) {
    strapi.log.info(JSON.stringify(ctx, null, 4));

    console.log(util.inspect(ctx.body, { depth: null }));
    ctx.send("confirm");
  },
});
