import { request } from '@/utils/request'

export const doLogin = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: { ...data, loading: true }
    })
}

export const loadMenuData = () => {
    return request({
        url: '/showview/menus.json',
        method: 'get'
    })
}

export const createUser = (user) => {
    return request.post('/loan/create', user)
}

export const logout = () => request.post('/user/logout');

export const getPersonList = params => request.get('/loan/list', { params })
