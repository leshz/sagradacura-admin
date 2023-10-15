export type invoiceType = {
  paymentId: string;
  status: string;
  resume?: string;
  metadata?: object;
  products: Array<object>;
  paidWith?: string;
  collectorId: string;
  preferenceId: string;
};

export interface confirmationQuery {
  collection_id: string;
  collection_status: string;
  payment_id: string;
  status: string;
  external_reference: string;
  payment_type: string;
  merchant_order_id: string;
  preference_id: string;
  site_id: string;
  processing_mode: string;
  merchant_account_id: string;
}
