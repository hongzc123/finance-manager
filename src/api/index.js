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

// 人员信息列表 -提交审核
export const doPersonSubmit = id => {
    return request.post('/loan/submitToApprove', { id })
}

// 救助情况列表-查看详情
export const showDetail = id =>{
    return request.get('/loan/query',{
        params: { id }
    })
}

// 救助情况列表-结案
export const doPass = id =>{
    return request.post('/approve/first/pass',{
        loanId: id,
        appId: id
    })
}

// 救助情况列表-拒绝立案
export const doReject = id =>{
    return request.post('/approve/first/reject',{
        loanId: id,
        appId: id
    })
}
