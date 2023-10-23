export const INVOICES_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  IN_PROCESS: "in_process",
  FAILED: "failed",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  INIT: "initial",
} as const;

export const URLS = {
  CHECKOUT: "/checkout",
  IMPUGNY_IPN: "/impugny/notifications",
};

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const MERCADOPAGO_TOPIC = {
  PAYMENT: "payment",
  MERCHANT_ORDER: "merchant_order",
};
export const MERCADOPAGO_MERCHAN_STATUS = {
  OPENED: "opened",
  CLOSED: "closed",
  EXPIRED: "expired",
};
