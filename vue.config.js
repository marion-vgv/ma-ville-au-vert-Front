module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/style/_vars.scss";
          `,
      },
    },
  },
};
