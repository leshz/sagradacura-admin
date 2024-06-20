/**
 * paquetes-coorporativo router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::paquetes-coorporativo.paquetes-coorporativo",
  {
    config: {
      find: {
        middlewares: ["api::paquetes-coorporativo.populating"],
      },
    },
  }
);
