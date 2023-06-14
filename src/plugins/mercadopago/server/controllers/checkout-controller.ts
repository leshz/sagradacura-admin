import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    console.log(ctx.headers);
    // const result = await strapi.db.query("api::product.product").findOne({
    //   select: ["*"],
    //   where: { id: 1 },
    // });
    // const test = await strapi
    //   .plugin("mercadopago")
    //   .service("meli")
    //   .createPreference();
    ctx.body = {};
    ctx.status = 404;
  },
});
