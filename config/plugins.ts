export default ({ env }) => {
  console.log(env.json("SERVICE_ACCOUNT_FILE", {}));
  return {
    "mercado-pago": {
      enabled: true,
      resolve: "./src/plugins/mercado-pago",
    },
    upload: {
      config: {
        provider:
          "@strapi-community/strapi-provider-upload-google-cloud-storage",
        providerOptions: {
          bucketName: env("BUCKET_NAME"),
          publicFiles: env.bool("BUCKET_PUBLIC_FILES", false),
          uniform: env.bool("BUCKET_UNIFORM", true),
          baseUrl: `https://storage.googleapis.com/${env("BUCKET_NAME")}`,
          serviceAccount: env.json("SERVICE_ACCOUNT_FILE", {}),
        },
      },
    },
  };
};
