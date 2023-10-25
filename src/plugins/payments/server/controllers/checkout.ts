import { Strapi } from "@strapi/strapi";
import { INVOICES_STATUS } from "../../constants/constants";

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
});
