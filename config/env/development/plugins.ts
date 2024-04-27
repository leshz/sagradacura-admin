export default ({ env }) => {
  return {
    payments: {
      enabled: true,
      resolve: "./src/plugins/payments",
    },
    "media-prefix": {
      enabled: true,
    },
    "duplicate-button": true,
    "import-export-entries": {
      enabled: true,
    },
  };
};
