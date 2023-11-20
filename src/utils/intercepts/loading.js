import { Loading } from 'element-ui'
import { AxiosError } from 'axios'
let service = {}

export const openLoading = config => {
    if (config?.loading) {
        // 需要指定全局loading
        service = Loading.service()
    }
    return config
}

export const closeLoading = response => {
    if (response?.config?.loading) service.close()
    return response
}

export const closeLoadingOnErr = error => {
    console.log('错误出现...', error, error instanceof AxiosError, error?.config?.loading)
    // 存在语法异常||AxiosArror
    if (error instanceof AxiosError) {
        if (error?.config?.loading) {
            service.close()
        }
    }
    return Promise.reject(error)
}
