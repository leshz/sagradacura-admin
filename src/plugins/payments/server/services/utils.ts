import { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";
const { ApplicationError } = errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  buildItems: async (items = [], platformId) => {
    const attibutes = ["id", "name", "price", "brief_description", "quantity"];
    if (!strapi.db) throw new Error("Database connection not available");
    const ids = items.map(({ productId = "" }) => ({ id: productId }));
    const {
      mercadopago: { default_currency },
    } = platformId;

    const results = await strapi.db.query("api::product.product").findMany({
      select: attibutes,
      where: {
        $or: ids,
        $and: [{ platform: platformId.id }],
      },
      populate: ["pictures"],
    });

    if (results.length === 0) throw new Error("Products not found");

    return results.map((product) => {
      const productSelected: any = items.find(
        ({ productId }) => productId === product.id
      );

      //build items with mercadopago format
      return {
        id: product.id,
        name: product.name,
        description: product.brief_description,
        quantity: productSelected?.quantity,
        unit_price: product.price,
        currency_id: default_currency,
      };
    });
  },
  buildBuyer: async (buyer = {}) => {
    return {
      name: "test",
      surname: "user-surname",
      email: "test@test.com",
      phone: {
        area_code: "11",
        number: "4444-4444",
      },
      identification: {
        type: "RUT",
        number: "12345678",
      },
    };
  },
  buildShipping: async (shipping = {}) => {
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
  getPlatform: async (platformId) => {
    try {
      if (!strapi.db) throw new Error("Database connection not available");
      const result = await strapi.db.query("api::platform.platform").findOne({
        select: ["*"],
        where: { uuid: platformId },
        populate: ["mercadopago"],
      });

      if (!result) {
        throw new ApplicationError("not platform", {
          service: "getPlatform",
        });
      }

      return result;
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "getPlatform",
      });
    }
  },
});
