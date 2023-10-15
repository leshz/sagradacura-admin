// @ts-nocheck
import utils from "@strapi/utils";

const loadConfigurationByPlatform = (options, { strapi }) => {
  return async (ctx, next) => {
    const {
      sanitize: { contentAPI },
    } = utils;

    const {
      header: { platform = "" },
    } = ctx;

    const sanitizedPlatform = await contentAPI.query(platform);
    if (!sanitizedPlatform) return ctx.badRequest("bad request");

    try {
      const result = await strapi.db.query("api::platform.platform").findOne({
        select: ["*"],
        where: { id: sanitizedPlatform },
      });
      if (!result) return ctx.badRequest("bad request");
      ctx.state.platform = await contentAPI.output(result);
      await next();
    } catch (error) {
      console.log("");
      console.log(error.message);
      return ctx.internalServerError(error.message, {
        middle: "loadConfigurationByPlatform",
      });
    }
  };
};

export default { loadConfigurationByPlatform };
