module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      port: 10085,
      host: '0.0.0.0',
      proxy: {
        '/api/': {
          target: "https://api.starjob.cn/",
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        }
      },
    }
  }
}
