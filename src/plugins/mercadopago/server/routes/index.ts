export default [
  {
    method: "POST",
    path: "/checkout",
    handler: "checkout.index",
    config: {
      policies: [],
      auth: false,
    },
  },
];
