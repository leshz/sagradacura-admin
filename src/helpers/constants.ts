const fieldsImage = ["url", "width", "height", "alternativeText", "formats"];

const seo = {
  fields: ["*"],
  populate: {
    metaSocial: {
      fields: ["title", "description", "socialNetwork", "image"],
      populate: {
        image: {
          fields: fieldsImage,
        },
      },
    },
  },
};

export { fieldsImage, seo };
