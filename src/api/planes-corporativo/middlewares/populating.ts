/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";
import { fieldsImage, seo } from "../../../helpers/constants";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      image: {
        fields: fieldsImage,
      },
      seo: seo,
      ...ctx.query.populate,
    };
    await next();
  };
};
