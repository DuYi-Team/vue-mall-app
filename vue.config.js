module.exports = {
  css: {
      loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: 37.5
              })
          ]
        }
      }
  },
}