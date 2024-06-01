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
  CHECK: "/",
  CHECKOUT: "/checkout",
  WEBHOOK: "/notifications",
};

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const NOTIFICATION_TYPES = {
  PAYMENT: "payment",
};

export const ACTIONS_TYPES = {
  CREATE: "payment.created",
  UPDATE: "payment.updated",
};

export const MERCADOPAGO_MERCHAN_STATUS = {
  OPENED: "opened",
  CLOSED: "closed",
  EXPIRED: "expired",
};
