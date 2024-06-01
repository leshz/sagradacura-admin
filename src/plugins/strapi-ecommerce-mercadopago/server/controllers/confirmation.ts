/**
 *  controller
 */

import * as util from "util";

import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async confirmation(ctx) {
    console.log(util.inspect(ctx.request.body, { depth: null }));
    ctx.send("confirm");
  },
});
