export default ({ env }) => {
  return {
    "mercado-pago": {
      enabled: true,
      resolve: "./src/plugins/mercado-pago",
    },
  };
};
