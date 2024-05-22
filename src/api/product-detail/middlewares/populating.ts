/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      promises: {
        fields: ["message", "icon"],
      },
      ...ctx.query.populate,
    };

    await next();
  };
};
