export type Reqproduct = {
  sku: number;
  quaity: number;
};

export type Reqbuyer = {
  dni: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
};
export type Reqship = {
  address: string;
  department: string;
  city: string;
  postalCode?: string;
  message?: string;
};
export type request = {
  buyer: Reqbuyer;
  ship: Reqship;
  items: Reqproduct[];
};
