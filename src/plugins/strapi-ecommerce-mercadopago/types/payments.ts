type PaymentData = {
  id: string;
};

export type PaymentPayload = {
  action: string;
  api_version: string;
  data: PaymentData;
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
};
