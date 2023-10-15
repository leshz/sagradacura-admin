export default ({ env }) => {
  return {
    payments: {
      enabled: true,
      resolve: "./src/plugins/payments",
    },
  };
};
