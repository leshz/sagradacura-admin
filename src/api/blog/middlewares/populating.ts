/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";
import { fieldsImage } from "../../../helpers/constants";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      image: {
        fields: fieldsImage,
      },
      tags: {
        fields: ["name", "slug"],
      },
      author: {
        fields: ["username"],
      },
      ...ctx.query.populate,
    };

    await next();
  };
};
