import { Strapi } from "@strapi/strapi";
import meli from "mercadopago";
import type { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

meli.configure({
  access_token: `${process.env.IMPUGNY_TOKEN_MELI}`,
});

export default ({ strapi }: { strapi: Strapi }) => ({
  createPreference: async ({ items }) => {
    const preference: CreatePreferencePayload = {
      binary_mode: true,
      items: [
        {
          title: "",
          unit_price: 1000,
          quantity: 1,
        },
      ],
      back_urls: {
        success: "http://localhost:8080/feedback",
        failure: "http://localhost:8080/feedback",
        pending: "http://localhost:8080/feedback",
      },
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
      return {};
    }
  },
});
