/**
 *  controller
 */

import type { Strapi } from "@strapi/strapi";
import type { config } from "../../types";
import { INVOICES_STATUS } from "../../constants";

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkout(ctx, next) {
    const { config }: { config: config } = ctx.state;

    const { items = [], buyer = {}, shipping = {} } = ctx.request.body || {};
    if (items.length === 0) return ctx.badRequest("Bad Request");

    const products = await strapi
      .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
      .products(items, config);

    const buyerData = await strapi
      .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
      .buyer(buyer);

    const shippingData = await strapi
      .service("plugin::strapi-ecommerce-mercadopago.mercadopago")
      .shipping(shipping);


      // let invoice = await strapi
      // .plugin("payments")
      // .service("invoice")
      // .createInitialInvoice({
      //   platform: config,
      //   buyer: buyerData,
      //   products,
      // });

    ctx.send("Tenemos servicio");
  },
});
