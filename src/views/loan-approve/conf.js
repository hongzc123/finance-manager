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
                label: 'id',
                type: 'text',
                key: 'id',
                value: '?'
            },
            {
                label: '姓名',
                type: 'text',
                key: 'name',
                value: '?'
            },
            {
                label: '出生日期',
                type: 'text',
                key: 'birthday',
                value: "?",
            },
            {
                label: '性别',
                type: 'text',
                key: 'sex',
                value: "?",
            },
            {
                label: '教育程度',
                type: 'text',
                key: 'education',
                value: "?",
            },
            {
                label: '地址',
                type: 'text',
                key: 'address1',
                value: "?",
            },
            {
                label: '手机号',
                type: 'text',
                key: 'mobile_phone',
                value: "?",
            },
            {
                label: '身份证',
                type: 'text',
                key: 'identity_card',
                value: "?",
            },
        ].map(e => {
            return {
                ...e,
                attrs: {
                    disabled: true
                }
            }
        })
    ]
}