/**
 * general controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::general.general"
  // MOD default controller
  // ({ strapi }) => ({
  //   async find(ctx) {
  //     const result = await super.find(ctx);
  //     const barmenu = await strapi.entityService.findOne(
  //       "plugin::menus.menu",
  //       1,
  //       { populate: "*", nested: true }
  //     );
  //     result.data.attributes.topmenu = barmenu;
  //     return result;
  //   },
  // })
);
