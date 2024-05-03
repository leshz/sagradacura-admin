/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";
import { fieldsImage } from "../../../helpers/constants";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = {
      pictures: {
        fields: fieldsImage,
      },
      categories: {
        fields: ["name", "slug"],
      },
      promotion: {
        fields: ["*"],
      },
      ...ctx.query.populate,
    };

    await next();
  };
};
