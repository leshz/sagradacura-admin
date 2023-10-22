import { Strapi } from "@strapi/strapi";
import { INVOICES_STATUS } from "../../constants/constants";
import { errors } from "@strapi/utils";

const { ApplicationError } = errors;

type products = {
  unit_price: number;
  quantity: number;
};

const getTotalInvoice = (products: products[]) => {
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.unit_price * product.quantity;
  }, 0);
  return totalPrice;
};

export default ({ strapi }: { strapi: Strapi }) => ({
  createInitialInvoice: async ({ platform, buyer, products = [] }) => {
    let extra = {};
    if (products.length) {
      extra = {
        products,
        total_invoice: getTotalInvoice(products),
      };
    }
    try {
      const savedata = await strapi.query("plugin::payments.invoice").create({
        data: {
          status: INVOICES_STATUS.INIT,
          platform: platform.id,
          buyer: buyer,
          buyer_email: buyer.email,
          ...extra,
        },
      });

      return savedata;
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "createInitialInvoice",
      });
    }
  },
  updateInvoice: async ({ invoiceId, data }) => {
    console.log(data);

    try {
      const savedata = await strapi.query("plugin::payments.invoice").update({
        where: { id: invoiceId },
        data: {
          ...data,
        },
      });

      return savedata;
    } catch (error) {
      throw new ApplicationError(error.message, {
        service: "updateInvoice",
      });
    }
  },
});
