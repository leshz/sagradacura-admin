import { URLS, METHODS } from "../../constants/constants";

export default [
  {
    method: METHODS.POST,
    path: URLS.CHECKOUT,
    handler: "checkout.checkout",
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
    path: URLS.IPN,
    handler: "ipn.ipn",
    config: {
      policies: [],
      auth: false,
    },
  },
];
