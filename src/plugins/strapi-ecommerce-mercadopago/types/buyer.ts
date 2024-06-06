export type buyer = {
  dni: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
};

export type buyerMeli = {
  name: string;
  surname: string;
  email: string;
  phone: {
    area_code: string;
    number: number;
  };
  identification: {
    type: string;
    number: number;
  };
  address: {
    zip_code: string;
    street_name: string;
    street_number: string;
  };
};
