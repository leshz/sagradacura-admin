const loadConfigurationByPlatform = (options, { strapi }) => {
  return async (ctx, next) => {
    const {
      header: { platform = "" },
    } = ctx;
    if (!platform) return ctx.badRequest("bad request");
    try {
      const result = await strapi.db.query("api::platform.platform").findOne({
        select: ["*"],
        where: { id: platform },
      });
      if (!result) return ctx.badRequest("bad request");
      ctx.state.platform = result;
      console.log("middleware");

      await next();
    } catch (error) {
      return ctx.throw("Internal Server Error");
    }
  };
};

export default { loadConfigurationByPlatform };
