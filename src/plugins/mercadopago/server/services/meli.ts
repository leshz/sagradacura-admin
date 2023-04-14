import { Strapi } from "@strapi/strapi";
import meli from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferencePayer,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
meli.configure({
  access_token:
    "TEST-1522607168195150-041310-03bd572890543bb7d6173aceb33ecd22-170194224",
});

export default ({ strapi }: { strapi: Strapi }) => ({
  createPreference: async () => {
    const preference: CreatePreferencePayload = {
      items: [
        {
          title: "Comparendo",
          unit_price: 135000,
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
      const response = await meli.preferences.create(preference);
      console.log(response.body.id);
    } catch (error) {
      return;
    }
    return "LLEGAMOS HASTA AQUI";
  },
});
