import type { Strapi } from "@strapi/strapi";
import type {
  config,
  reqProduct,
  buildedProduct,
  buyer,
  shipping,
} from "../../types";
import { errors } from "@strapi/utils";
import { MercadoPagoConfig, Preference, MerchantOrder } from "mercadopago";

const productFormatter = (products, config: config): buildedProduct[] => {
  const { default_currency } = config;

  return products.map((product) => {
    const { pictures, promotion, categories, price } = product;
    const categoryId = categories?.[0]?.id || 0;
    const { with_discount = false, price_with_discount = 0 } = promotion || {};
    const finalPriceProduct = with_discount ? price_with_discount : price;
    const urlImage = pictures?.[0]?.url || "";

    return {
      id: product.sku,
      title: product.name,
      description: product.short_description,
      picture_url: urlImage,
      quantity: product.quantity,
      currency_id: default_currency,
      unit_price: finalPriceProduct,
      category_id: categoryId,
    };
  });
};

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
  createPreference: async (
    { products, payer, internalInvoiceId },
    config: config
  ) => {
    const { token, back_urls, bussiness_description } =
      config;

    const items = productFormatter(products, config);
    const client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000, idempotencyKey: "abc" },
    });

    const preference = new Preference(client);
    const payment_methods = { installments: 24, default_installments: 1 };

    const metadata = {};
    const body = {
      back_urls: {
        failure: back_urls,
        pending: back_urls,
        success: back_urls,
      },
      binary_mode: true,
      external_reference: internalInvoiceId,
      items,
      metadata,
      payer,
      payment_methods,
      statement_descriptor: bussiness_description,
    };
    try {
      const response = await preference.create({ body });
      return response;
    } catch (error) {
      throw new errors.ApplicationError(error.message, {
        service: "createPreference",
      });
    }
  },
});
