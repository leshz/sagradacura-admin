/**
 * product-detail router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::product-detail.product-detail",
  {
    config: {
      find: {
        middlewares: ["api::product-detail.populating"],
      },
    },
  }
);
