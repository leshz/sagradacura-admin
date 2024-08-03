/**
 * envio router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::envio.envio", {
  config: {
    find: {
      middlewares: ["api::envio.populating"],
    },
  },
});
