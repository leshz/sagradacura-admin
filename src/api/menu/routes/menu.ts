/**
 * menu router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::menu.menu", {
  config: { find: { middlewares: ["api::menu.populating"] } },
});
