export default [
  {
    method: "POST",
    path: "/checkout",
    handler: "checkout.checkoutProcess",
    config: {
      middlewares: ["plugin::mercadopago.loadConfigurationByPlatform"],
      policies: [],
      auth: false,
    },
  },
];
