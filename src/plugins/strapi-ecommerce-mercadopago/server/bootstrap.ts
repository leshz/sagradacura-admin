import { Strapi } from "@strapi/strapi";
import shipping from "../components/mercadopago/shipping.json";
import shopper from "../components/mercadopago/shopper.json";

export default async ({ strapi }: { strapi: Strapi }) => {
  const shippingComponent = strapi.components["mercadopago.shipping"];
  const shopperComponent = strapi.components["mercadopago.shopper"];

  if (!shopperComponent && !shippingComponent) {
    strapi.log.info("Register new components");
    const res = await strapi
      .plugin("content-type-builder")
      .services.components.createComponent({
        component: {
          category: "mercadopago",
          displayName: shipping.info.displayName,
          icon: shipping.info.icon,
          attributes: shipping.attributes,
        },
        components: [
          {
            tmpUID: "mercadopago.shopper",
            category: "mercadopago",
            displayName: shopper.info.displayName,
            icon: shopper.info.icon,
            attributes: shopper.attributes,
          },
        ],
      });
  }
};
