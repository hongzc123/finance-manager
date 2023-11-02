const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  devServer:{
    open:true,
    proxy:{// http-proxy-middware
      '/baidu':{
        target:'http://www.baidu.com'
      },
      // 应用内的ajax访问到了/api 则算命中,按照当前规则做代理
      '/jindu':{
        target:'http://jinduedu.net:5004',
        pathRewrite:{
          '^/jindu':'/api'
        },
        logLevel:'debug', // 以调试级别来输出日志
        // "@vue/cli-service": "~5.0.0", 4~5的版本需要加上如下一行来显示日志
        logProvider:()=>console,
        // 让最终的接口服务器看到真实客户端的IP，而非代理IP
        changeOrigin:true
      }
    }
  }
}
