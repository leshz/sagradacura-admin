import { Strapi } from "@strapi/strapi";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { errors } from "@strapi/utils";

const { ApplicationError } = errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  createPayment: async ({ items, platform, payer, internalInvoiceId }) => {
    const { statementDescriptor, notificationUrl, backUrls, melitoken } =
      platform;

    console.log("platform", platform);

    if (melitoken === "") {
      throw new ApplicationError("No platform id", {
        service: "createPayment",
      });
    }

    const client = new MercadoPagoConfig({
      accessToken: melitoken,
      options: { timeout: 5000, idempotencyKey: "abc" },
    });
    const payment = new Payment(client);
    const body = {
      items,
      payer,
      statement_descriptor: statementDescriptor,
      notification_url: notificationUrl || "",
      back_urls: { ...backUrls },
      external_reference: internalInvoiceId,
    };
    try {
      const response = await payment.create({ body });
      return { ...response };
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "createPayment",
      });
    }
  },
});
