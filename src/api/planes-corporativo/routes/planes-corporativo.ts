/**
 * planes-corporativo router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::planes-corporativo.planes-corporativo",
  {
    config: {
      find: {
        middlewares: ["api::planes-corporativo.populating"],
      },
    },
  }
);
