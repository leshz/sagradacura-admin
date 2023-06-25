// TODO sanited data
import { Strapi } from "@strapi/strapi";

const buildIMelitems = async (items = []) => {
  //TODO: sum quantities when the same product is added
  const ids = items.map(({ productId = "" }) => ({ id: productId }));
  const results = await strapi.db.query("api::product.product").findMany({
    select: ["*"],
    where: { $or: ids },
  });

  return results.map((product) => {
    const productSelected: any = items.find(
      ({ productId }) => productId === product.id
    );
    return {
      id: product.id,
      title: product.title,
      currency_id: product.currencyId,
      description: product.description,
      quantity: productSelected?.quantity,
      unit_price: product.price,
    };
  });
};

const buildMeliPayer = async (buyer = {}) => {
  return {
    payer: {
      name: "test",
      surname: "user-surname",
      email: "user@email.com",
      date_created: "2015-06-02T12:58:41.425-04:00",
      phone: {
        area_code: "11",
        number: "4444-4444",
      },
      identification: {
        type: "RUT",
        number: "12345678",
      },
      address: {
        street_name: "Street",
        street_number: 123,
        zip_code: "5700",
      },
    },
  };
};
const buildMeliShipping = async (shipping = {}) => {
  return {
    shipments: {
      receiver_address: {
        zip_code: "5700",
        street_number: 123,
        street_name: "Street",
        floor: 4,
        apartment: "C",
      },
    },
  };
};

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkoutProcess(ctx, next) {
    const {
      request: { body },
      state: { platform },
    } = ctx;
    const { items = [], payer = {}, shipping = {} } = body;
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await buildIMelitems(items);
    const payerInfo = await buildMeliPayer(payer);
    const shippingInfo = await buildMeliShipping(shipping);
    try {
      const preference = await strapi
        .plugin("mercado-pago")
        .service("meli")
        .createPreference({
          platform,
          items: products,
          payerInfo,
        });
      ctx.body = preference;
    } catch (error) {
      console.log(error, "");
      console.log("controller");
    }
  },
});
