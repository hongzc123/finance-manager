// tokenExpires
import { isExpires } from '@/utils'

let refreshing = true;
let cacheRequest = [];
export const refreshReqFn = request => {
    // console.log(request)
    return async config => {
        // console.log(config)
        const token = window.sessionStorage.getItem('token')
        let needRefresh = isExpires(token, 0) //半小时的自动刷新token

        // 测试代码，避免登录时首次调用login后，needRefresh为true需要刷新token
        // 无限调用login接口
        if (config.url === '/user/login') return config

        // 同步请求 await request() await request2()

        if (needRefresh) {
            // 当前token过期，进来两个请求
            if (refreshing) { // A
                refreshing = false
                console.log('自动刷新token needRefresh', needRefresh)
                await request.post('/user/login', {
                    account: 'admin',
                    password: 'approve123456.'
                })
                // 允许以后过期时刷新
                refreshing = true
                // 释放后续请求
                cacheRequest.forEach(cb => cb())
                cacheRequest.length = 0
                cacheRequest = []
            } else {
                // B 缓存起来等待，刷新后再请求
                return new Promise((resolve, reject) => {
                    cacheRequest.push(() => {
                        // 放行并行向下传递请求配置，（拦截器队列），最终触发请求
                        resolve(config);
                    })
                })
            }
        }

        // 异步请求 request() request2()

        return config
    }
}