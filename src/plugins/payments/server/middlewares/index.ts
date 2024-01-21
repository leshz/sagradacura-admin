const getConfigByPlatform = (options, { strapi }) => {
  return async (ctx, next) => {
    const { request } = ctx;
    const {
      header: { platformid = "" },
    } = request;

    const sanitizedPlatform = platformid;
    if (!sanitizedPlatform) return ctx.badRequest("bad request");

    try {
      const result = await strapi.db
        .query("api::configuration.configuration")
        .findOne({
          select: ["*"],
          where: { uid: sanitizedPlatform },
          populate: ["mercadopago"],
        });

      if (!result) {
        return ctx.badRequest("bad request");
      }
      ctx.state.config = result;
      return await next();
    } catch (error) {
      console.log(error);

      return ctx.internalServerError(error.message, {
        middle: "getConfigByPlatform",
      });
    }
  };
};

const paymentFF = (options, { strapi }) => {
  return async (ctx, next) => {
    const {
      state: { config = {} },
    } = ctx;
    const { payments = false } = config;
    if (payments) {
      return await next();
    }
    return ctx.serviceUnavailable("Service Unavailable", { payment: false });
  };
};

export default { getConfigByPlatform, paymentFF };
