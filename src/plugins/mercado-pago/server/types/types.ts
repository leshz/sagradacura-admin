export type invoiceType = {
  paymentId: string;
  status: string;
  resume?: string;
  metadata?: object;
  netPrice: number;
  totalPrice: number;
  paidWith?: string;
  collectorId: string;
  mercadopagoId: string;
};
