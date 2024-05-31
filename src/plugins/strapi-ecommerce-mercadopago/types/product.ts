export type reqProduct = {
  sku: string;
  quantity: number;
};

export type buildedProduct = {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id?: string;
  unit_price: number;
};
