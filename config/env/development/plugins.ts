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
    transformer: {
      enabled: true,
      config: {
        headers: ["Strapi-Transformer-Ignore"],
        responseTransforms: {
          removeAttributesKey: true,
          removeDataKey: true,
        },
        plugins: {
          ids: {
            menus: true,
          },
        },
      },
    },
    menus: {
      config: {
        maxDepth: 3,
      },
    },
    seo: {
      enabled: true,
    },
    "vercel-deploy": {
      enabled: env.bool("VERCEL_PLUGIN_ENABLED", false),
      config: {
        deployHook: env("VERCEL_DEPLOY_PLUGIN_HOOK", ""),
        apiToken: env("VERCEL_DEPLOY_PLUGIN_API_TOKEN", ""),
        appFilter: env("VERCEL_DEPLOY_PLUGIN_APP_FILTER", ""),
        teamFilter: "",
        roles: ["strapi-super-admin", "strapi-editor"],
      },
    },
  };
};
