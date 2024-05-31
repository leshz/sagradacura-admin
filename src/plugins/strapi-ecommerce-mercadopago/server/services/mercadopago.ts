import type { Strapi } from "@strapi/strapi";
import type {
  config,
  reqProduct,
  buildedProduct,
  buyer,
  shipping,
} from "../../types";
import { errors } from "@strapi/utils";

export default ({ strapi }: { strapi: Strapi }) => ({
  products: async (items: reqProduct[]): Promise<any[]> => {
    const attibutes = [
      "id",
      "name",
      "price",
      "short_description",
      "slug",
      "stock",
      "sku",
    ];

    if (!strapi.db) throw new errors.ApplicationError("Service not Available");

    const sku = items.map(({ sku = "" }) => ({ sku }));

    const results: any[] = await strapi.db
      .query("plugin::strapi-ecommerce-mercadopago.product")
      .findMany({
        select: attibutes,
        where: { $or: sku },
        populate: ["pictures", "promotion", "categories"],
      });

    if (results.length === 0)
      throw new errors.ApplicationError("products are not availables");

    return results.map((product) => {
      const productSelected: any = items.find(({ sku }) => sku === product.sku);

      if (productSelected?.quantity > product.stock) {
        throw new errors.ApplicationError("stock no available", {
          product: product.sku,
          stock: product.stock,
        });
      }

      return {
        ...product,
        stock: null,
        quantity: productSelected?.quantity,
      };
    });
  },
  buyer: async (buyer: buyer): Promise<buyer> => {
    return buyer;
  },
  shipping: async (shipping: shipping): Promise<shipping> => {
    return shipping;
  },

  productFormatter: (products, config: config): buildedProduct[] => {
    const { default_currency } = config;
    return products.map((product) => {
      return {
        sku: product.sku,
        name: product.name,
        description: product.short_description,
        quantity: product?.quantity,
        unit_price: product.price,
        currency_id: default_currency,
      };
    });
  },
});
