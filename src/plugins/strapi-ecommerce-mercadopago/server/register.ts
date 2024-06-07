import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  const shopper = {
    collectionName: "components_mercadopago_shopper",
    category: "mercadolibre",
    modelName: "shopper",
    globalId: "ComponentMercadolibreShopper",
    uid: "mercadolibre.shopper",
    info: {
      displayName: "shopper",
      icon: "user",
    },
    options: {},
    attributes: {
      name: {
        type: "string",
        required: true,
      },
      last_name: {
        type: "string",
        required: true,
      },
      dni: {
        type: "biginteger",
        required: true,
      },
      phone: {
        type: "biginteger",
        required: true,
      },
      email: {
        type: "email",
        required: true,
      },
    },
  };
  const shipping = {
    collectionName: "components_mercadopago_shipping",
    category: "mercadolibre",
    modelName: "shipping",
    globalId: "ComponentMercadolibreShipping",
    uid: "mercadolibre.shipping",
    info: {
      displayName: "shipping",
      icon: "user",
    },
    options: {},
    attributes: {
      department: {
        type: "string",
        required: true,
      },
      city: {
        type: "string",
        required: true,
      },
      address: {
        type: "string",
        required: true,
      },
      postal_code: {
        type: "biginteger",
        required: false,
      },
      message: {
        type: "string",
        required: false,
      },
    },
  };
  strapi.components["mercadolibre.shopper"] = shopper as any;
  strapi.components["mercadolibre.shipping"] = shipping as any;
};
