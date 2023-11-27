export const columns = {
    attrs: {
        align: 'center'
    },
    items: [
        {
            label:'用户名',
            prop:'account'
        },
        {
            label:'创建者',
            prop:'creator'
        },
        {
            label:'创建者',
            prop:'creator'
        },
        {
            label:'密码',
            prop:'password'
        },
        {
            label:'创建时间',
            prop:'reg_time',
            filter:'convertDate'
        },
        {
            label:'权限类型',
            prop:'role_name',
            filter:'common'
        }
    ]
}