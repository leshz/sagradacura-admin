export const productPriceSummary = (product) => {
  const { quantity = 1, price, promotion } = product;
  const { price_with_discount = 0, with_discount = false } = promotion || {};

  // precio total * cantidad
  const fullPrice = price * quantity;

  // precio con descuento * cantidad
  const fullPriceDiscount = with_discount
    ? (price_with_discount || 0) * quantity
    : fullPrice;

  // precio total menos precio total con despuesto
  const totalDiscounted = fullPrice - fullPriceDiscount;

  // precio total - total descontado
  const finalPrice = fullPrice - totalDiscounted;

  return { fullPrice, fullPriceDiscount, totalDiscounted, finalPrice };
};

export const productsPricesSummary = (products) => {
  const pricingInfo = products.map((product) => {
    const { fullPrice, fullPriceDiscount, totalDiscounted, finalPrice } =
      productPriceSummary(product);

    return {
      fullPrice,
      fullPriceDiscount,
      totalDiscounted,
      finalPrice,
      ...product,
    };
  });

  // precio total del producto * cantidades
  const totalFullPrice = pricingInfo.reduce(
    (acum, product) => acum + product.fullPrice,
    0
  );

  // precio total del producto con descuento * cantidades
  const totalFullPriceDiscount = pricingInfo.reduce(
    (acum, product) => acum + product.fullPriceDiscount,
    0
  );

  // precio total descontado
  const totalDiscounted = pricingInfo.reduce(
    (acum, product) => acum + product.totalDiscounted,
    0
  );

  // precio total menos el total de descuentos
  const total = totalFullPrice - totalDiscounted;

  return {
    totalFullPrice,
    totalFullPriceDiscount,
    totalDiscounted,
    total,
  };
};

export const mergeShipmentAtProducts = (products, shipment) => {
  const addShipment = Object.keys(shipment).length > 0;
  return addShipment ? [...products, shipment] : products;
};

export const calculateWithShipment = (total: number, shipment: any) => {
  const addShipment = Object.keys(shipment).length > 0;
  return addShipment ? total + shipment?.unit_price : total;
};

export const fieldsImage = [
  "url",
  "width",
  "height",
  "alternativeText",
  "formats",
];
