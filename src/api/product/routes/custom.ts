export default {
  routes: [
    {
      method: "GET",
      path: "/products/:slug",
      handler: "product.findOne",
    },
  ],
};
