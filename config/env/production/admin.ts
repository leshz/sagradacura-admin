const favicon =
  "https://storage.googleapis.com/shzcms.appspot.com/Impugny3_a6fd54cfca_0c6b18fbe4/Impugny3_a6fd54cfca_0c6b18fbe4.png";

export default ({ env }) => ({
  BROWSER: false,
  url: "/adminn",
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    logo: favicon,
    menu: favicon,
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  head: {
    favicon: favicon,
  },
});
