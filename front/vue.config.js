module.exports = {
  devServer: {
    proxy: {
      "/node": {
        target: "http://localhost:8000",
        pathRewrite: { "^/node": "" },
      },
      "/profiles": {
        target: "https://randomuser.me/",
        pathRewrite: { "^/profiles": "" },
      },
    },
  },
};
