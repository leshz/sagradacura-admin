/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      shipping: {
        fields: ["type", "price", "name"],
      },
    };

    await next();
  };
};
