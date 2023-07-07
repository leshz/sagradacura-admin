// TODO sanited data
import { Strapi } from "@strapi/strapi";
import Meli from "../../mocks/preference.json";
import { v4 as uuidv4 } from "uuid";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkoutProcess(ctx, next) {
    const {
      request: { body },
      state: { platform },
    } = ctx;
    const { items = [], payer = {}, shipping = {} } = body;
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildIMelitems(items);

    const payerInfo = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildMeliPayer(payer);

    // TODO: build shipping
    const shippingInfo = await strapi
      .plugin("mercado-pago")
      .service("helpers")
      .buildMeliShipping(shipping);

    try {
      const invoiceId = uuidv4();
      const { response } = await strapi
        .plugin("mercado-pago")
        .service("preferences")
        .createPreference({
          platform,
          items: products,
          payerInfo,
          internalInvoiceId: invoiceId,
        });

      const { id, collector_id } = response;
      const savedata = await strapi
        .plugin("mercado-pago")
        .service("invoices")
        .createInvoice({
          paymentId: invoiceId,
          status: "pending",
          netPrice: 0,
          totalPrice: 0,
          mercadopagoId: id,
          collectorId: collector_id,
          metadata: response,
        });

      ctx.body = savedata;
    } catch (error) {
      console.log(error.message);
      console.log("controller");
    }
  },
  async checkoutNotification(ctx, next) {},
});
