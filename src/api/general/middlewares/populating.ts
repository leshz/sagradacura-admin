/**
 * `populating` middleware
 */

import { Strapi } from "@strapi/strapi";
import { fieldsImage } from "../../../helpers/constants";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      top: {
        fields: ["phone", "title", "social_links"],
        populate: {
          social_links: {
            fields: ["link", "icon", "text"],
          },
        },
      },
      menu: {
        fields: [
          "logo",
          "home",
          "nuestra_marca",
          "productos",
          "cart",
          "mobile",
        ],
        populate: {
          logo: {
            fields: fieldsImage,
          },
          home: {
            fields: ["*"],
          },
          nuestra_marca: {
            fields: ["*"],
          },
          productos: {
            fields: ["*"],
          },
          mobile: {
            fields: ["*"],
          },
        },
      },
      footer: {
        fields: ["columns", "botton", "news_letter"],
        populate: {
          columns: {
            fields: ["title", "column"],
          },
          botton: {
            fields: ["copyright", "phone"],
          },
          news_letter: {
            fields: ["title", "label"],
          },
        },
      },
    };
    await next();
  };
};
