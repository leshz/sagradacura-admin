export default [
  {
    method: "POST",
    path: "/checkout",
    handler: "controller.checkoutProcess",
    config: {
      middlewares: ["plugin::payments.getConfigByPlatform"],
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
