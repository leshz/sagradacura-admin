//@ts-nocheck
import { Strapi } from "@strapi/strapi";

const buildIMelitems = async (items = []) => {
  const ids = items.map(({ productId = "" }) => ({ id: productId }));
  const results = await strapi.db.query("api::product.product").findMany({
    select: ["*"],
    where: { $or: ids },
  });

  return results.map((product) => {
    const productSelected = items.find(
      ({ productId }) => productId === product.id
    );
    return {
      id: product.id,
      title: product.Title,
      currency_id: product.Currency_id,
      description: product.Description,
      quantity: productSelected?.quantity,
      unit_price: product.Price,
    };
  });
};

const buildMeliBuyer = async (buyer = {}) => buyer;
const buildMeliShipping = async (shipping = {}) => shipping;

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkoutProcess(ctx) {
    const {
      request: { body },
    } = ctx;
    const { items = [], buyer = {}, shipping = {} } = body;
    if (items.length === 0) return ctx.badRequest("Bad Request");
    const products = await buildIMelitems(items);
    const buyerInfo = await buildMeliBuyer(buyer);
    const shippingInfo = await buildMeliShipping(shipping);
    console.log(ctx.state.platform);

    const preference = await strapi
      .plugin("mercadopago")
      .service("meli")
      .createPreference({
        items: products,
        buyer: buyerInfo,
        shipping: shippingInfo,
      });

    ctx.body = { preference: "test" };
  },
});
