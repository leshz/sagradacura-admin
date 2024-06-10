/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";
import { fieldsImage } from "../../../helpers/constants";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = {
      image: {
        fields: fieldsImage,
      },
      ...ctx.query.populate,
    };

    await next();
  };
};
