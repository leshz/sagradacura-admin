import { URLS, METHODS } from "../../constants/constants";

export default [
  {
    method: METHODS.POST,
    path: URLS.CHECKOUT,
    handler: "controller.checkout",
    config: {
      middlewares: [
        "plugin::payments.getConfigByPlatform",
        "plugin::payments.paymentFF",
      ],
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: URLS.IMPUGNY_IPN,
    handler: "controller.ipn",
    config: {
      policies: [],
      auth: false,
    },
  },
];
