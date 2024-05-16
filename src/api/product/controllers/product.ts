/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async findOne(ctx) {
      await this.validateQuery(ctx);
      const { slug } = ctx.params;
      const entity = await strapi.db.query("api::product.product").findOne({
        where: { slug },
        populate: true,
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
