export const columns = {
    attrs: {
        align: 'center'
    },
    items: Object.freeze([
        {
            prop: 'birthday',
            label: '出生日期',
            filter: 'convertDate'
        },
        {
            prop: 'name',
            label: '姓名',
        },
        {
            prop: 'identity_card',
            label: '身份证号',
        },
        {
            prop: 'operation',
            label: '操作',
        }
    ])
}

export const conf = {
    items: [
        [
            {

            }
        ]
    ]
}