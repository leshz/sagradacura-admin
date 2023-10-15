import { Strapi } from "@strapi/strapi";
import meli from "mercadopago";
import utils from "@strapi/utils";

meli.configure({
  access_token: `${process.env.IMPUGNY_TOKEN_MELI}`,
});

const { ApplicationError } = utils.errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  createPreference: async ({ items, platform, payer, internalInvoiceId }) => {
    const { statementDescriptor, notificationUrl, backUrls } = platform;
    //TODO: build payer
    const preference = {
      items,
      // payer,
      statement_descriptor: statementDescriptor,
      notification_url: notificationUrl || "",
      back_urls: { ...backUrls },
      external_reference: internalInvoiceId,
    };
    try {
      const {
        body: { id, init_point, collector_id },
      } = await meli.preferences.create(preference);

      return { id, init_point, collector_id };
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "createPreference",
      });
    }
  },
});
