import crypto from "crypto";
import { config } from "../../types";
import type { Strapi } from "@strapi/strapi";

const verifySign = (option, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    try {
      const queryParams = ctx.request.query;

      const xSignature = ctx.request.headers["x-signature"];
      const xRequestId = ctx.request.headers["x-request-id"];

      const dataID = queryParams?.["data.id"];
      const parts = xSignature.split(",");

      const { config }: { config: config } = ctx.state;
      let ts;
      let hash;

      parts.forEach((part) => {
        const [key, value] = part.split("=");
        if (key && value) {
          const trimmedKey = key.trim();
          const trimmedValue = value.trim();
          if (trimmedKey === "ts") {
            ts = trimmedValue;
          } else if (trimmedKey === "v1") {
            hash = trimmedValue;
          }
        }
      });

      const secret = config.webhook_pass;

      const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(manifest);

      const sha = hmac.digest("hex");

      if (sha === hash) {
        strapi.log.info("Webhook Auth Auccess");
        return next();
      } else {
        strapi.log.info("Webhook Auth Failed");
        return ctx.serviceUnavailable("Service Unavailable");
      }
    } catch (error) {
      strapi.log.error("Error sign Auth Middleware");
      strapi.log.error(error);
      return ctx.serviceUnavailable("Service Unavailable");
    }
  };
};

export { verifySign };
