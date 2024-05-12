/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = {
      table: {
        fields: ["*"],
      },
      summary: {
        fields: ["*"],
      },
      ...ctx.query.populate,
    };

    await next();
  };
};
