export default [
  {
    method: "GET",
    path: "/checkout",
    handler: "checkout.index",
    config: {
      policies: [],
      auth: false,
    },
  },
];
