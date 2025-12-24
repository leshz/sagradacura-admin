import { purchase } from "../../templates/admin-purchase";
import { purchaseDynamic } from "../../templates/admin-purchase-dynamic";
import _ from "lodash";
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
    const attributes = [
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
        select: attributes,
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
        populate: ["shopper", "shipping"],
      });

    if (invoice === null) {
      strapi.log.info(`Invoice: not found`);
      return;
    }

    if (invoice.payment_status === INVOICES_STATUS.APPROVED) {
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
            paid_with: "mercadopago",
            payment_id: id,
          },
        });

      strapi.log.info(
        `Invoice: ${invoiceId} has been updated with Status: ${status}`
      );

      await invoice.products.forEach(async (product) => {
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
        // Pre-procesar productos para el template
        const productsHtml = invoice.products
          .map(
            (product: any) => `
        <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px; margin-bottom: 10px; display: flex; gap: 15px;">
          ${product.picture_url
                ? `<img src="${product.picture_url}" alt="${product.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;" />`
                : ""
              }
          <div style="flex: 1;">
            <div style="font-size: 15px; font-weight: bold; margin-bottom: 8px; color: #0092ff;">${product.title
              }</div>
            <div style="margin-bottom: 5px;"><span style="color: #666;">SKU: ${product.id
              }</span></div>
            <div style="margin-bottom: 5px;"><span style="color: #666;">Cantidad:</span> <span style="font-weight: bold;">${product.quantity
              }</span></div>
            <div style="margin-bottom: 5px;"><span style="color: #666;">Precio unitario:</span> <span style="font-weight: bold;">$${product.unit_price
              }</span></div>
            <div style="border-top: 1px solid #ddd; margin-top: 8px; padding-top: 8px;">
              <span style="color: #666;">Subtotal:</span> <span style="font-weight: bold; color: #0092ff; font-size: 16px;">$${product.unit_price * product.quantity
              }</span>
            </div>
          </div>
        </div>
      `
          )
          .join("");

        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: "leshz@me.com",
            from: "admin@sagradacura.com",
          },
          purchaseDynamic,
          {
            invoice: {
              id: invoice.id,
              total: invoice.total,
              payment_status: invoice.payment_status,
              paid_with: invoice.paid_with || "No especificado",
              payment_id: invoice.payment_id || "Pendiente",
            },
            productsHtml: productsHtml,
            shopper: _.pick(invoice.shopper || {}, [
              "name",
              "last_name",
              "email",
              "phone",
              "dni",
            ]),
            shipping: {
              address: invoice.shipping?.address || "",
              city: invoice.shipping?.city || "",
              department: invoice.shipping?.department || "",
              postal_code: invoice.shipping?.postal_code || "No especificado",
              message: invoice.shipping?.message || "Sin mensaje",
            },
          }
        );
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
