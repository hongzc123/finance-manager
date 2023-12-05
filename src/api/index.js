import { request } from '@/utils/request'
import Axios from 'axios';

export const doLogin = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: { ...data, loading: true }
    })
}

// .json结尾 转换/api 为空
export const loadMenuData = () => {
    return request({
        url: '/showview/menus.json',
        method: 'get'
    })
}

// 菜单
export const loadMenuDataForLocal = () => {
    return Axios.get('/menus.json')
}

export const createUser = (user) => {
    return request.post('/loan/create', user)
}

export const logout = () => request.post('/user/logout');

export const getPersonList = params => request.get('/loan/list', { params })

// 人员信息列表 -提交审核
export const doPersonSubmit = id => {
    return request.post('/loan/submitToApprove', { id })
}

// 救助情况列表-查看详情
export const showDetail = id => {
    return request.get('/loan/query', {
        params: { id }
    })
}

// 救助情况列表-结案
export const doPass = id => {
    return request.post('/approve/first/pass', {
        loanId: id,
        appId: id
    })
}

// 救助情况列表-拒绝立案
export const doReject = id => {
    return request.post('/approve/first/reject', {
        loanId: id,
        appId: id
    })
}

// 园区详情 -下载备案文件
export const downloadFile = id => {
    return request.get(`/contract/download?id=${id}`)
}

export const downloadFileByUrl = url => {
    return request.get(url, { responseType: 'blob' })
}

