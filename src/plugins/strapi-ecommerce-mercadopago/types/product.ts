export type reqProduct = {
  sku: string;
  quantity: number;
};

export type buildedProduct = {
  sku: string;
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
};
