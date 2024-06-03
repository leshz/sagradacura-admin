/**
 *  controller
 */

import { factories } from "@strapi/strapi";
import type { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";

export default factories.createCoreController(
  "plugin::strapi-ecommerce-mercadopago.product",
  ({ strapi }: { strapi: Strapi }) => ({
    async findOne(ctx) {
      await this.validateQuery(ctx);

      const { slug } = ctx.params;
      if (!strapi.db)
        throw new errors.ApplicationError("Service not Available");

      const entity = await strapi.db
        .query("plugin::strapi-ecommerce-mercadopago.product")
        .findOne({
          where: { slug },
          populate: true,
        });

      if (entity === null) return ctx.notFound();
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return ctx.send(this.transformResponse(sanitizedEntity));
    },
  })
);
