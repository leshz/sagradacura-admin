import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const test = await strapi
      .plugin("mercadopago")
      .service("meli")
      .createPreference();

    ctx.body = test;
  },
});
