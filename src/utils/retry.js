import { retry } from '@/utils'

export const retryResFn = request => {
    return (response) => {
        console.log('请求超时...', response)

        // retry 处理
        // response 是每次产生的一个新对象，但config是同一个
        if (response.code === 'ECONNABORTED' && response.config.retryCount !== 3) {
            if (!response.config.retryCount) response.config.retryCount = 1;
            console.log('retryCount', response.config.retryCount)
            response.config.retryCount++;
            retry(request(response.config), 3, 1).catch(err => {
                console.log('err', err)
            })
        }

        // return response;
        // 异常抛给后续拦截器，或者控制台
        return Promise.reject(response)
    };
}