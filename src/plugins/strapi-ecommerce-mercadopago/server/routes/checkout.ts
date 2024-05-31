import { METHODS, URLS } from "../../constants";

export default {
  type: "content-api",
  routes: [
    {
      method: METHODS.POST,
      path: URLS.CHECKOUT,
      handler: "checkout.checkout",
      config: {
        middlewares: ["plugin::strapi-ecommerce-mercadopago.loadConfig"],
      },
    },
  ],
};
