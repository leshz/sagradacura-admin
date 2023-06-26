// TODO sanited data
import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkoutProcess(ctx, next) {
    const {
      request: { body },
      state: { platform },
    } = ctx;
    const { items = [], payer = {}, shipping = {} } = body;
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildIMelitems(items);

    const payerInfo = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildMeliPayer(payer);

    // TODO: build shipping
    const shippingInfo = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildMeliShipping(shipping);
    try {
      const preference = await strapi
        .plugin("mercado-pago")
        .service("mercadopago")
        .createPreference({
          platform,
          items: products,
          payerInfo,
        });

      ctx.body = preference;
    } catch (error) {
      console.log(error.message);
      console.log("controller");
    }
  },
  async checkoutNotification(ctx, next) {},
});
