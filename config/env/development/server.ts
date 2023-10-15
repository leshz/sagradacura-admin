const favicon =
  "https://storage.googleapis.com/shzcms.appspot.com/Impugny3_a6fd54cfca_0c6b18fbe4/Impugny3_a6fd54cfca_0c6b18fbe4.png";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  auth: {
    logo: favicon,
  },
  // Replace the favicon
  head: {
    favicon: favicon,
  },
  app: {
    keys: env.array("APP_KEYS"),
  },
  tutorials: false,
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  admin: {
    watchIgnoreFiles: ["**/data", "./data"],
  },
});
