export default [
  {
    method: "POST",
    path: "/checkout",
    handler: "preferences.checkoutProcess",
    config: {
      middlewares: ["plugin::mercado-pago.loadConfigurationByPlatform"],
      policies: [],
      auth: false,
    },
  },
];
