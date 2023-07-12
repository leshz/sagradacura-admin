"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createInvoiceDescription = (products) => {
    const description = products.map((product) => {
        return `${product.name} x ${product.quantity}
    unit_price: ${product.unit_price}  ||  total: ${product.unit_price * product.quantity}`;
    });
    const totalPrice = products.reduce((acc, product) => {
        return acc + product.unit_price * product.quantity;
    }, 0);
    return { description: description.join(", "), totalPrice };
};
exports.default = ({ strapi }) => ({
    createInvoice: async (invoice) => {
        try {
            const { products, paymentId, preferenceId, collectorId, metadata, status, } = invoice;
            const { description, totalPrice } = createInvoiceDescription(products);
            const savedata = await strapi
                .query("plugin::mercado-pago.invoice")
                .create({
                data: {
                    paymentId,
                    status,
                    preferenceId,
                    resume: description,
                    totalPrice,
                    netPrice: totalPrice,
                    collectorId,
                    metadata,
                },
            });
            return savedata;
        }
        catch (error) {
            console.log(error.message);
            console.log("service");
        }
    },
});
