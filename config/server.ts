export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  auth: {
    logo: "../public/uploads/Impugny3_9865755c64.png",
  },
  // Replace the favicon
  head: {
    favicon: "../favicon.png",
  },
  app: {
    keys: env.array("APP_KEYS"),
  },
  tutorials: false,
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
