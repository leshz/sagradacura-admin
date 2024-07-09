const fieldsImage = ["url", "width", "height", "alternativeText", "formats"];

const seo = {
  fields: ["*"],
  populate: {
    metaImage: {
      fields: fieldsImage,
    },
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
