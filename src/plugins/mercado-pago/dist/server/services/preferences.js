"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mercadopago_1 = __importDefault(require("mercadopago"));
const utils_1 = __importDefault(require("@strapi/utils"));
mercadopago_1.default.configure({
    access_token: `${process.env.IMPUGNY_TOKEN_MELI}`,
});
const { ApplicationError } = utils_1.default.errors;
exports.default = ({ strapi }) => ({
    createPreference: async ({ items, platform, payer, internalInvoiceId }) => {
        const { statementDescriptor, notificationUrl, backUrls } = platform;
        //TODO: build payer
        const preference = {
            items,
            // payer,
            statement_descriptor: statementDescriptor,
            notification_url: notificationUrl || "",
            back_urls: { ...backUrls },
            external_reference: internalInvoiceId,
        };
        try {
            const { body: { id, init_point, collector_id }, } = await mercadopago_1.default.preferences.create(preference);
            return { id, init_point, collector_id };
        }
        catch (error) {
            throw new ApplicationError(error.message, {
                service: "createPreference",
            });
        }
    },
});
