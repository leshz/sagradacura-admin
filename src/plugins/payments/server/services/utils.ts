import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  buildIMelitems: async (items = []) => {
    //TODO: sum quantities when the same product is added
    if (!strapi.db) throw new Error("Database connection not available");
    const ids = items.map(({ productId = "" }) => ({ id: productId }));
    const results = await strapi.db.query("api::product.product").findMany({
      select: ["*"],
      where: { $or: ids },
    });

    if (results.length === 0) throw new Error("Products not found");

    return results.map((product) => {
      const productSelected: any = items.find(
        ({ productId }) => productId === product.id
      );
      return {
        id: product.id,
        name: product.name,
        currency_id: product.currencyId,
        description: product.description,
        quantity: productSelected?.quantity,
        unit_price: product.price,
      };
    });
  },
  buildMeliPayer: async (buyer = {}) => {
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
  },
  buildMeliShipping: async (shipping = {}) => {
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
  },
});
