/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      categories: {
        fields: ["title", "all_products"],
      },
      ...ctx.query.populate,
    };

    await next();
  };
};
