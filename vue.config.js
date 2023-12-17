const { defineConfig } = require('@vue/cli-service')

// 判断当前是开发还是生成环境
const isProduction = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin'); // 去除console.log&&console.warn 避免占用内存
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 查看更多优化

let cliConfig = {}
if (isProduction) {
  // 不需要生产环境打包后能查看源码，设为false
  cliConfig.productionSourceMap = false
  // 插件配置
  cliConfig.configureWebpack = {
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'console.warn']
          }
        }
      }),
      new BundleAnalyzerPlugin()
    ]
  }
} else {
  cliConfig = {
    devServer: {
      // 禁用webpack代码检查报错【不建议开发使用,看不到需要的错误提示】
      client: {
        overlay: false,
      },
      open: false,
      // http-proxy-middware
      proxy: {
        '/baidu': {
          target: 'http://www.baidu.com'
        },
        '/test': {
          target: 'http://localhost:3000',
          pathRewrite: {
            '^/test': ''
          }
        },
        // 应用内的Ajax访问到了/jindu 则算命中，按照当前规则做代理
        '/jindu': {
          // target: 'http://jinduedu.net:5004',
          // target: 'http://118.25.146.173:5004',
          target: process.env.VUE_APP_URL,
          // 用于重写 URL 路径。它允许你将特定的路径映射到不同的路径
          // pathRewrite: {
          //   '^/jindu': '/api'
          // },
          // 配置一个target服务下两种pathRewrite
          pathRewrite: function (path, req) {
            // console.log(path, '重写...', req.originalUrl)
            if (path.endsWith('.json')) return path.replace('/jindu', '')
            return path.replace('/jindu', '/api')
          },
          logLevele: 'debug', // 以调试级别来输出日志
          // "@vue/cli-service": "~5.0.0" ，4~5的版本需要加上如下一行来显示日志
          logProvider: () => console,
          // 让最终的接口服务器看到真实客户端的IP，而非代理IP
          changeOrigin: true // 属性一般可有可无，设置为true后端可以获取到更多的IP信息
        }
      }
    }
  }
}

module.exports = cliConfig

// module.exports = defineConfig({
//   devServer: {
//     // 禁用webpack代码检查报错【不建议开发使用,看不到需要的错误提示】
//     client: {
//       overlay: false,
//     },
//     open: false,
//     // http-proxy-middware
//     proxy: {
//       '/baidu': {
//         target: 'http://www.baidu.com'
//       },
//       '/test': {
//         target: 'http://localhost:3000',
//         pathRewrite: {
//           '^/test': ''
//         }
//       },
//       // 应用内的Ajax访问到了/jindu 则算命中，按照当前规则做代理
//       '/jindu': {
//         // target: 'http://jinduedu.net:5004',
//         // target: 'http://118.25.146.173:5004',
//         target: process.env.VUE_APP_URL,
//         // 用于重写 URL 路径。它允许你将特定的路径映射到不同的路径
//         // pathRewrite: {
//         //   '^/jindu': '/api'
//         // },
//         // 配置一个target服务下两种pathRewrite
//         pathRewrite: function (path, req) {
//           // console.log(path, '重写...', req.originalUrl)
//           if (path.endsWith('.json')) return path.replace('/jindu', '')
//           return path.replace('/jindu', '/api')
//         },
//         logLevele: 'debug', // 以调试级别来输出日志
//         // "@vue/cli-service": "~5.0.0" ，4~5的版本需要加上如下一行来显示日志
//         logProvider: () => console,
//         // 让最终的接口服务器看到真实客户端的IP，而非代理IP
//         changeOrigin: true // 属性一般可有可无，设置为true后端可以获取到更多的IP信息
//       }
//     }
//   }
// })
