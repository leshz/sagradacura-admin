import { Strapi } from "@strapi/strapi";
import meli from "mercadopago";

meli.configure({
  access_token: `${process.env.IMPUGNY_TOKEN_MELI}`,
});

export default ({ strapi }: { strapi: Strapi }) => ({
  createPreference: async ({ items, platform, payer }) => {
    const { statementDescriptor, notificationUrl, backUrls } = platform;
    const preference = {
      binary_mode: true,
      items,
      payer,
      statement_descriptor: statementDescriptor,
      notification_url: notificationUrl,
      back_urls: { ...backUrls },
      auto_return: "approved",
    };
    try {
      const data = await meli.preferences.create(preference);
      const {
        body: { id, init_point },
      } = data;

      return {
        id: id,
        init_url: init_point,
        response: data,
      };
    } catch (error) {
      console.log(error, "Error Service");
    }
  },
});
