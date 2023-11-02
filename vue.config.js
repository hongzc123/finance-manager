const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = defineConfig({
  devServer: {
    open: true,
    // http-proxy-middware
    proxy: {
      '/baidu': {
        target: 'http://www.baidu.com'
      },
      // 应用内的Ajax访问到了/jindu 则算命中，按照当前规则做代理
      '/jindu': {
        target: 'http://jinduedu.net:5004',
        // 用于重写 URL 路径。它允许你将特定的路径映射到不同的路径
        pathRewrite: {
          '^/jindu': '/api'
        }
      }
    }
  }
})
