import { Strapi } from "@strapi/strapi";
import { MercadoPagoConfig, Preference, MerchantOrder } from "mercadopago";
import { errors } from "@strapi/utils";
import { URLS } from "../../constants/constants";

const { ApplicationError } = errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  createPreference: async ({
    products,
    platform,
    payer,
    internalInvoiceId,
  }) => {
    const { mercadopago, uuid } = platform;
    const { token, back_urls, notification_url, effecty } = mercadopago;

    const excludedPayment = { effecty: effecty };
    const excludedKeys = Object.keys(excludedPayment);
    const excludedMethods = Object.values(excludedPayment)
      .map((value, index) => {
        return !value ? { id: excludedKeys[index] } : { id: "" };
      })
      .filter(({ id }) => id !== "");

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
    const payment_methods = {
      excluded_payment_methods: excludedMethods,
      installments: 12,
      default_installments: 1,
    };

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
      notification_url: `${notification_url}${URLS.NOTIFICATIONS_MELI_URL}?platform=${uuid}`,
      payer,
      payment_methods,
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
  getMerchantOrder: async ({ id, config }) => {
    const { mercadopago } = config;
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
