export default [
  {
    method: "POST",
    path: "/checkout",
    handler: "preferences.checkoutProcess",
    config: {
      middlewares: ["plugin::payments.loadConfigurationByPlatform"],
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/confirmation",
    handler: "preferences.confirmationProcess",
    config: {
      policies: [],
      auth: false,
    },
  },
];
