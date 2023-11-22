import Axios from 'axios'
import { refreshReqFn } from './intercepts/refreshToken'

import {
    duplicateReq,
    duplicateRes,
    duplicateErr
} from './intercepts/duplicateRequest'

import { openLoading, closeLoading, closeLoadingOnErr } from './intercepts/loading'

import { businessFn, sysExceptionFn } from './intercepts/exception'

import { transfer } from './dataTransform'

// 1.创建实例封装baseUrl和timeout
export const request = Axios.create({
    baseURL: '/jindu',
    timeout: 5000,
    transformResponse: [transfer]
})

// 2.封装拦截器实现自动处理token
request.interceptors.request.use(config => {
    let token = window.sessionStorage.getItem('token')
    if (token) {
        config.headers.token = token
    }
    return config
})

request.interceptors.response.use(response => {
    // 使用可选链兼容请求menu接口时没有两层data
    let token = response.data?.data?.token
    if (token) {
        window.sessionStorage.setItem('token', token)
    }
    return response
})

// 1.请求去重
request.interceptors.request.use(duplicateReq)
request.interceptors.response.use(duplicateRes, duplicateErr)

// 2.loading控制
request.interceptors.request.use(openLoading)
request.interceptors.response.use(closeLoading, closeLoadingOnErr)

// 处理业务异常 和 系统异常
request.interceptors.response.use(businessFn, sysExceptionFn)

// 4.无感刷新token(依赖3的结果)
// 无感刷新token，token临近过期之前
request.interceptors.request.use(refreshReqFn(request))

// request.interceptors.request.use(duplicateReq)
// request.interceptors.response.use(duplicateRes, duplicateErr)

