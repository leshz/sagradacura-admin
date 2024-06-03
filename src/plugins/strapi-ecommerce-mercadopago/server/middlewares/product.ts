import type { Strapi } from "@strapi/strapi";
import { fieldsImage } from "../../helpers";

export const populating = (config, { strapi }: { strapi: Strapi }) => {
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

    return next();
  };
};
