module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-mall-app/'
    : '/',
};
