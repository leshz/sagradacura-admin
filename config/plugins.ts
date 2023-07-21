export default {
  "mercado-pago": {
    enabled: true,
    resolve: "./src/plugins/mercado-pago",
  },
  upload: {
    config: {
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        bucketName: "shzcms.appspot.com",
        publicFiles: true,
        uniform: true,
        basePath: "",
      },
    },
  },
};
