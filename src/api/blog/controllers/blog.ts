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
        populate: { tags: true, author: true, image: true },
      });

      if (entity === null) return ctx.send({ data: null });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
