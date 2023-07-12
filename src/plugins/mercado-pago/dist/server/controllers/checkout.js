"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("@strapi/utils"));
const constants_1 = require("../constants/constants");
exports.default = ({ strapi }) => ({
    async checkoutProcess(ctx, next) {
        const { sanitize: { contentAPI }, } = utils_1.default;
        const { platform } = ctx.state;
        const sanitizeBody = await contentAPI.query(ctx.request.body);
        const { items = [], payer = {}, shipping = {} } = sanitizeBody;
        if (items.length === 0)
            return ctx.badRequest("Bad Request");
        const products = await strapi
            .plugin("mercado-pago")
            .service("helpers")
            .buildIMelitems(items);
        // TODO: build buyer info
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
            const invoiceId = (0, uuid_1.v4)();
            const preference = await strapi
                .plugin("mercado-pago")
                .service("preferences")
                .createPreference({
                platform,
                items: products,
                // payerInfo,
                internalInvoiceId: invoiceId,
            });
            const { id, collector_id, init_point } = preference;
            const savedata = await strapi
                .plugin("mercado-pago")
                .service("invoices")
                .createInvoice({
                paymentId: invoiceId,
                status: constants_1.INVOICES_STATUS.IN_PROCESS,
                products: products,
                preferenceId: id,
                collectorId: collector_id,
                metadata: preference,
            });
            if (!savedata) {
                return ctx.internalServerError("Creating invoice Error", {
                    controller: "createInvoice",
                });
            }
            const data = { invoiceId: invoiceId, init_point };
            ctx.body = await contentAPI.output(data);
        }
        catch (error) {
            return ctx.internalServerError(error.message, {
                controller: "checkoutProcess",
            });
        }
    },
    async confirmationProcess(ctx, next) {
        try {
            const { sanitize: { contentAPI }, } = utils_1.default;
            const sanitizeQuery = await contentAPI.query(ctx.query);
            const savedata = await strapi.db
                .query("plugin::mercado-pago.invoice")
                .findOne({
                select: ["*"],
                where: { paymentId: sanitizeQuery.external_reference },
            });
            //TODO Covertir funcion a servicio
            if (savedata.status === constants_1.INVOICES_STATUS.IN_PROCESS) {
                const updateData = await strapi.db
                    .query("plugin::mercado-pago.invoice")
                    .update({
                    where: { paymentId: sanitizeQuery.external_reference },
                    data: {
                        status: sanitizeQuery.status,
                        paidWith: sanitizeQuery.payment_type,
                    },
                });
                return (ctx.body = await contentAPI.output(updateData));
            }
            return await contentAPI.output(savedata);
        }
        catch (error) {
            return ctx.internalServerError(error.message, {
                controller: "checkoutProcess",
            });
        }
    },
    async checkoutNotification(ctx, next) { },
});
