import utils from "@strapi/utils";

const getConfigByPlatform = (options, { strapi }) => {
  return async (ctx, next) => {
    const {
      sanitize: { contentAPI },
    } = utils;

    const {
      header: { platform = "" },
    } = ctx;
    // const sanitizedPlatform = await contentAPI.query(platform);
    const sanitizedPlatform = platform;
    if (!sanitizedPlatform) return ctx.badRequest("bad request");

    try {
      const result = await strapi.db.query("api::platform.platform").findOne({
        select: ["*"],
        where: { id: sanitizedPlatform },
      });
      if (!result) return ctx.badRequest("bad request");
      // ctx.state.platform = await contentAPI.output(result);
      ctx.state.platform = result;
      await next();
    } catch (error) {
      console.log("");
      console.log(error.message);
      return ctx.internalServerError(error.message, {
        middle: "getConfigByPlatform",
      });
    }
  };
};

export default { getConfigByPlatform };
