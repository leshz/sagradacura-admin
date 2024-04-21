/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";
import { fieldsImage } from "../../../helpers/constants";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      banners: {
        fields: ["title", "image", "link", "dinamic_banner"],
        populate: {
          link: {
            fields: ["link", "text"],
          },
          image: {
            fields: fieldsImage,
          },
          dinamic_banner: {
            fields: ["text", "image"],
            populate: {
              image: {
                fields: fieldsImage,
              },
            },
          },
        },
      },
      product_categories: {
        field: ["title", "categories"],
        populate: {
          categories: {
            fields: ["first_line", "second_line", "image", "link"],
            populate: {
              image: {
                fields: fieldsImage,
              },
            },
          },
        },
      },
      ...ctx.query.populate,
    };
    await next();
  };
};
