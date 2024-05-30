export default {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/checkout",
      handler: "checkout.checkout",
    },
  ],
};
