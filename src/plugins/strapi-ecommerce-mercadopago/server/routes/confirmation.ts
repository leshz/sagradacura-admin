export default {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/confirmation",
      handler: "confirmation.confirmation",
    },
  ],
};
