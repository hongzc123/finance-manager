// tokenExpires
import { isExpires } from '@/utils'

export const refreshReqFn = request => {
    console.log(request)
    return async config => {
        console.log(config)
        const token = window.sessionStorage.getItem('token')
        let needRefresh = isExpires(token) // true

        // 测试代码，避免首次调用login后，needRefresh为true需要刷新token
        // 无限调用login接口
        if (config.url === '/user/login') return config

        // 同步请求 await request() await request2()
        if (needRefresh) {
            await request.post('/user/login', {
                account: 'admin',
                password: 'approve123456.'
            })
        }

        // 异步请求 request() request2()

        return config
    }
}