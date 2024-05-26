import { type Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async check(ctx, next) {
    return ctx.send("ok");
  },
});
