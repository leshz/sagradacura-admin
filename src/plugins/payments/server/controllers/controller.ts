import { Strapi } from "@strapi/strapi";
import { v4 as uuidv4 } from "uuid";
import utils from "@strapi/utils";
import {
  INVOICES_STATUS,
  MERCADOPAGO_TOPIC,
  MERCADOPAGO_MERCHAN_STATUS,
} from "../../constants/constants";
import type { confirmationQuery } from "../../types/types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkout(ctx, next) {
    const { platform } = ctx.state;
    const { items = [], buyer = {} } = ctx.request.body || {};
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await strapi
      .plugin("payments")
      .service("utils")
      .buildItems(items, platform);

    // TODO: Definir la informacion del bayer
    const personalInfo = await strapi
      .plugin("payments")
      .service("utils")
      .buildBuyer(buyer);

    // TODO: build shipping
    // const shippingInfo = await strapi
    //   .plugin("mercado-pago")
    //   .service("helpers")
    //   .buildMeliShipping(shipping);

    try {
      let invoice = await strapi
        .plugin("payments")
        .service("invoice")
        .createInitialInvoice({ platform, buyer: personalInfo, products });

      if (!invoice) {
        return ctx.internalServerError("Creating invoice Error", {
          controller: "createInvoice",
        });
      }

      const preference = await strapi
        .plugin("payments")
        .service("mercadopago")
        .createPreference({
          invoiceId: invoice.id,
          products,
          payer: personalInfo,
          platform,
          internalInvoiceId: invoice.id,
        });

      const { id, collector_id, init_point, metadata } = preference;

      invoice = await strapi
        .plugin("payments")
        .service("invoice")
        .updateInvoice({
          invoiceId: invoice.id,
          data: {
            metadata,
            status: INVOICES_STATUS.IN_PROCESS,
            collectorId: collector_id,
            preferenceId: id,
          },
        });

      return ctx.send({ init_point, preferenceId: id, invoiceId: invoice.id });
    } catch (error) {
      return ctx.internalServerError(error, {
        controller: "checkout",
      });
    }
  },
  async ipn(ctx, next) {
    try {
      console.log("________________________");

      const { platfromId = "", id = "" } = ctx.query;
      const { topic } = ctx.request.body || {};
      if (platfromId === "") return ctx.badRequest("bad request");

      const platformInfo = await strapi
        .plugin("payments")
        .service("utils")
        .getPlatform(platfromId);

      if (MERCADOPAGO_TOPIC.MERCHANT_ORDER === topic) {
        const order = await strapi
          .plugin("payments")
          .service("mercadopago")
          .getMerchantOrder({ id, platform: platformInfo });

        const { external_reference, status } = order;

        if (MERCADOPAGO_MERCHAN_STATUS.CLOSED === status) {
          await strapi
            .plugin("payments")
            .service("invoice")
            .updateInvoice({
              invoiceId: external_reference,
              data: {
                status: INVOICES_STATUS.APPROVED,
              },
            });
        }
      }
      return ctx.send("ok");
    } catch (error) {
      return ctx.internalServerError(error.message, {
        controller: "IPN",
      });
    }
  },
  async checkoutNotification(ctx, next) {},
});
