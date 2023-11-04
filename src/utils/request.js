import Axios from 'axios'

// 1.创建实例封装baseUrl和timeout
export const request = Axios.create({
    baseURL: '/jindu',
    timeout: 5000
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

