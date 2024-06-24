import { Strapi } from "@strapi/strapi";
import shipping from "./components/shipping.json";
import shopper from "./components/shopper.json";

export default async ({ strapi }: { strapi: Strapi }) => {
  const shippingComponent = strapi.components["mercadopago.shipping"];
  const shopperComponent = strapi.components["mercadopago.shopper"];

  if (!shopperComponent && !shippingComponent) {
    strapi.log.info("Register new components");
    strapi.components["mercadopago.shipping"] = shipping as any;
    strapi.components["mercadopago.shopper"] = shopper as any;
  }
};
