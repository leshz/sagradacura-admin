/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    async findOne(ctx) {
      await this.validateQuery(ctx);
      const { id } = ctx.params;
      const entity = await strapi.db.query("api::blog.blog").findOne({
        where: { slug: id },
        populate: true,
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
