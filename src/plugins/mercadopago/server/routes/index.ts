import { URLS, METHODS } from "../../constants/constants";

export default [
  {
    type: 'content-api',
    method: METHODS.GET,
    path: URLS.CHECK,
    handler: "check.check",
    config: {
      auth: false,
    },
  },
  {
    method: METHODS.POST,
    path: URLS.CHECKOUT,
    handler: "checkout.checkout",
    config: {
      middlewares: [
        "plugin::mercadopago.getConfigByPlatform",
        "plugin::mercadopago.paymentFF",
      ],
      policies: [],
    },
  },
  {
    method: METHODS.POST,
    path: URLS.IPN,
    handler: "ipn.ipn",
    config: {
      policies: [],
      auth: false,
    },
  },
];
