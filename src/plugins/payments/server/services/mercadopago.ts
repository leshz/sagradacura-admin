import { Strapi } from "@strapi/strapi";
import { MercadoPagoConfig, Preference, MerchantOrder } from "mercadopago";
import { errors } from "@strapi/utils";

const { ApplicationError } = errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  createPreference: async ({
    products,
    platform,
    payer,
    internalInvoiceId,
  }) => {
    const { mercadopago } = platform;
    const { token, back_urls, notification_url } = mercadopago;

    if (token === "") {
      throw new ApplicationError("not enought information to platform", {
        service: "createPayment",
      });
    }

    const client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000, idempotencyKey: "abc" },
    });
    const preference = new Preference(client);

    const metadata = {};
    const body = {
      back_urls: {
        failure: back_urls,
        pending: back_urls,
        success: back_urls,
      },
      binary_mode: true,
      external_reference: internalInvoiceId,
      items: products,
      metadata,
      notification_url,
      payer,
      statement_descriptor: platform.description,
    };

    try {
      const response = await preference.create({ body });
      return response;
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "createPayment",
      });
    }
  },
  getMerchantOrder: async ({ id, platform }) => {
    const { mercadopago } = platform;
    const { token } = mercadopago;
    const client = new MercadoPagoConfig({
      accessToken: token,
    });

    try {
      const merchantOrder = new MerchantOrder(client);
      const response = await merchantOrder.get({ merchantOrderId: id });
      return response;
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "getMerchantOrder",
      });
    }
  },
});
