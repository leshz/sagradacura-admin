const loadConfig = (options, { strapi }) => {
  return async (ctx, next) => {
    const config = await strapi.db
      .query("plugin::strapi-ecommerce-mercadopago.configuration")
      .findOne({
        select: ["active", "token"],
      });

    const { active = false } = config;
    if (active) {
      ctx.state.config = config;
      return await next();
    }

    return ctx.serviceUnavailable("Service Unavailable");
  };
};

export { loadConfig };
