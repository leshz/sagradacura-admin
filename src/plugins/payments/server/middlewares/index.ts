const getConfigByPlatform = (options, { strapi }) => {
  return async (ctx, next) => {
    const { request } = ctx;
    const {
      header: { platformid = "" },
    } = request;

    const sanitizedPlatform = platformid;
    if (!sanitizedPlatform) return ctx.badRequest("bad request");

    try {
      const result = await strapi.db.query("api::platform.platform").findOne({
        select: ["*"],
        where: { uuid: sanitizedPlatform },
        populate: ["mercadopago"],
      });

      if (!result) {
        return ctx.badRequest("bad request");
      }
      ctx.state.platform = result;
      return await next();
    } catch (error) {
      return ctx.internalServerError(error.message, {
        middle: "getConfigByPlatform",
      });
    }
  };
};

const paymentFF = (options, { strapi }) => {
  return async (ctx, next) => {
    const {
      state: { platform = {} },
    } = ctx;

    const { payment = false } = platform;
    if (payment) {
      return await next();
    }
    return ctx.serviceUnavailable("Service Unavailable", { payment: false });
  };
};

export default { getConfigByPlatform, paymentFF };
