import { request } from '@/utils/request'

export const doLogin = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export const loadMenuData = () => {
    return request({
        url: '/showview/menus.json',
        method: 'get'
    })
}