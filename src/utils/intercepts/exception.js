import { Notification } from 'element-ui'
import { SUCCESS, ERR102 } from '@/conf/req_fields'

// 业务异常
export const businessFn = response => {
    console.log(response)
    if (!Array.isArray(response?.data)) {
        if (response?.data?.code !== SUCCESS) {
            Notification.warning({
                title: "警告",
                message: response?.data?.data
            })
        } else {
            if (response?.data?.data?.info) {
                Notification.success({
                    title: "操作成功",
                    message: response?.data?.data?.info
                })
            }
        }
    }
    return response
}

// 系统异常
export const sysExceptionFn = error => {
    console.log(error)
    Notification.error({
        title: '系统异常',
        message: error.message
    })
    return error
}