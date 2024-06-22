export default {
    routes: [
      {
        method: "GET",
        path: "/blogs/:slug",
        handler: "blog.findOne",
      },
    ],
  };