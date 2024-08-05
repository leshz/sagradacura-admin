const loadConfig = (options, { strapi }) => {
  return async (ctx, next) => {
    const config = await strapi.db
      .query("plugin::strapi-ecommerce-mercadopago.configuration")
      .findOne({
        select: [
          "active",
          "token",
          "webhook_pass",
          "default_currency",
          "back_urls",
          "bussiness_description",
          "notification_url",
          "send_emails",
          "email",
        ],
      });

    const { active = false, token = "" } = config || {};
    if (active && token) {
      ctx.state.config = config;
      return next();
    }
    return ctx.serviceUnavailable("Service Unavailable");
  };
};

export { loadConfig };
