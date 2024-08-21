import { purchase } from "../../templates/admin-purchase";
import type { Strapi } from "@strapi/strapi";
import type {
  config,
  reqProduct,
  buildedProduct,
  buyer,
  buyerMeli,
  shipping,
  PaymentPayload,
} from "../../types";
import { errors } from "@strapi/utils";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { INVOICES_STATUS, TYPE_OF_PRODUCTS } from "../../constants";
import { mergeShipmentAtProducts } from "../../helpers";

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
  meliProduct: (product, config) => {
    return productFormatter(product, config);
  },
  products: async (items: reqProduct[]): Promise<any[]> => {
    const attibutes = [
      "id",
      "name",
      "price",
      "short_description",
      "slug",
      "stock",
      "type",
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
  buyer: async (buyer: buyer, ship: shipping): Promise<buyerMeli> => {
    const { dni, email, lastName, name, phone } = buyer;
    const { postalCode = "", address, city, department } = ship;
    const payer = {
      name,
      surname: lastName,
      email,
      phone: {
        area_code: "57",
        number: phone,
      },
      identification: {
        type: "CC",
        number: dni,
      },
      address: {
        zip_code: postalCode,
        street_name: `${department} ${city}`,
        street_number: `${address}`,
      },
    };

    return payer;
  },
  shipment: async (shipping: shipping, products): Promise<any> => {
    const { type: shippingType = "SW01" } = shipping;
    const includeShipment = products.some(({ type }) => {
      return type === TYPE_OF_PRODUCTS.PRODUCT;
    });

    if (includeShipment) {
      const shipment = await strapi
        .query("plugin::strapi-ecommerce-mercadopago.shipment")
        .findOne({
          select: ["*"],
          where: { code: shippingType },
        });

      if (!shipment) {
        return {};
      }

      return {
        id: shipment.code,
        title: "Cargo de envio",
        description: "Cargo de envio",
        quantity: 1,
        unit_price: shipment.price,
        currency_id: "COP",
      };
    }
    return {};
  },
  createPreference: async (
    { products, payer, internalInvoiceId, shipment },
    config: config
  ) => {
    const { token, back_urls, bussiness_description, notification_url } =
      config;

    const productsFormmated = productFormatter(products, config);
    const items = mergeShipmentAtProducts(productsFormmated, shipment);
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
      notification_url,
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
  paymentHook: async (payload: PaymentPayload, config: config) => {
    const { token = "", send_emails, email } = config;
    const {
      data: { id = "" },
    } = payload;

    if (Number(id) === 123456) {
      return;
    }

    const client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000, idempotencyKey: "abc" },
    });

    if (id === "") {
      throw new errors.ApplicationError("no ID", {
        service: "paymentAction",
      });
    }

    const paymentService = new Payment(client);
    const response = await paymentService.get({ id });

    const {
      status,
      additional_info,
      external_reference: invoiceId,
      payment_type_id = "",
    } = response;

    const { items = [], ip_address } = additional_info || {};

    const invoice = await strapi
      .query("plugin::strapi-ecommerce-mercadopago.invoice")
      .findOne({
        select: ["*"],
        where: { id: invoiceId },
      });

    if (invoice === null) {
      strapi.log.info(`Invoice: not found`);
      return;
    }

    if (invoice.status === INVOICES_STATUS.APPROVED) {
      strapi.log.info(`Invoice: On retry but it has status approved`);
      return;
    }

    // PAYMENT SUCCESSFULL
    if (status === INVOICES_STATUS.APPROVED) {
      // UPDATE STATUS FROM PAYMENT SERVICE
      strapi.log.info(`TO THE MOON 🚀`);
      await strapi
        .query("plugin::strapi-ecommerce-mercadopago.invoice")
        .update({
          where: { id: invoiceId },
          data: {
            payment_status: status,
            paid_with: payment_type_id,
          },
        });

      strapi.log.info(
        `Invoice: ${invoiceId} has been updated with Status: ${status}`
      );

      await items.forEach(async (product) => {
        const dbproduct = await strapi
          .query("plugin::strapi-ecommerce-mercadopago.product")
          .findOne({ where: { sku: product.id } });

        if (dbproduct) {
          const newStock = Number(dbproduct.stock) - Number(product.quantity);
          await strapi
            .query("plugin::strapi-ecommerce-mercadopago.product")
            .update({
              where: { sku: product.id },
              data: {
                stock: newStock,
              },
            });
          strapi.log.info(
            `Product: ${dbproduct.sku} has been updated with Stock: ${newStock}`
          );
        } else {
          strapi.log.info(`Product without update: ${product.id}`);
        }
      });
      // TODO : move to service
      if (send_emails) {
        await strapi.plugins["email"].services.email.send({
          to: email,
          from: "admin@sagradacura.com",
          subject: "Nuevo pedido recibido :)",
          html: purchase,
        });
      }
    } else {
      await strapi
        .query("plugin::strapi-ecommerce-mercadopago.invoice")
        .update({
          where: { id: invoiceId },
          data: {
            status,
            paid_with: payment_type_id,
          },
        });
      strapi.log.info(
        `Invoice: ${invoiceId} has been updated with Status: ${status}`
      );
    }
  },
});
