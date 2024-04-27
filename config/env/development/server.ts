export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // auth: {
  //   logo: favicon,
  // },
  // head: {
  //   favicon: favicon,
  // },
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
  url: env('PUBLIC_URL', 'http://localhost:1337')
});
