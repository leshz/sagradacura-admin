import { URLS, METHODS } from "../../constants/constants";

export default [
  {
    method: METHODS.POST,
    path: URLS.checkout,
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
  // {
  //   method: "POST",
  //   path: "/confirmation",
  //   handler: "preferences.confirmationProcess",
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
];
