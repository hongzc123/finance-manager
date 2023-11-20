import { isCancel } from 'axios'
const requests = []

// 生成一个唯一标识的token
function parseConfig(config) {
    if (typeof config === 'string') {
        console.log('字符串', config)
        return config
    }
    let query = JSON.stringify(config.params)
    return `${config.method}_${config.url}_${query}`
}

// 通过找到token标识来关闭请求，同时删除队列上的元素
function killRequestByToken(token) {
    // 循环保存requests数组，来干掉对应的请求
    for (let i = 0; i < requests.length; i++) {
        const req = requests[i]
        if (req.token === token) {
            // 取消请求
            req.controller.abort()
            // 删除当前元素
            // 结束方法及循环
            return requests.splice(i, 1)
        }
    }
}

export const duplicateReq = config => {
    let controller = new AbortController()

    // 去除当前请求的队列元素
    let token = parseConfig(config)
    killRequestByToken(token)

    // 加入当前请求进入队列
    requests.push({
        token,
        controller
    })

    // 绑定到axios上一个signal信号，【很重要，必须传递，否则无法通过abort关闭请求】
    config.signal = controller.signal

    return config
}

export const duplicateRes = response => {
    // 响应回来时，去除当前请求
    let token = parseConfig(response.config)
    killRequestByToken(token)

    return response
}

export const duplicateErr = error => {
    if (isCancel(error)) {
        console.log('请求被取消了...')
    }

    // 页面出现webpack-innerError(Canceled)没有问题，生产环境不存在
    return Promise.reject(error)
}