/**
 * tratamiento-de-dato router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::tratamiento-de-dato.tratamiento-de-dato",
  {
    config: {
      find: {
        middlewares: ["api::tratamiento-de-dato.populating"],
      },
    },
  }
);
