export const columns = {
    // attrs: {
    //     align: 'center'
    // },
    items: Object.freeze([
        {
            prop: 'birthday',
            label: '出生日期',
            width: 120,
            filter: 'convertDate'
        },
        {
            prop: 'name',
            label: '姓名',
            width: 120,
        },
        {
            label: '性别',
            prop: 'sex',
            filter: 'common'
        },
        {
            prop: 'education',
            label: '教育程度',
            filter: 'common'
        },
        {
            prop: 'address1',
            label: '居住地址',
        },
        {
            prop: 'mobile_phone',
            label: '手机号',
        },
        {
            label: '案件状态',
            prop: 'status',
            width: 100
        },
        {
            label: '操作',
            prop: 'operation',
            width: 300,
            slot: true
        },
        {
            label: '配送信息',
            children: [
                {
                    label: '地址',
                    children: [
                        { label: '省份', prop: 'name' },
                        { label: '市区' },
                        { label: '街道', prop: 'address' },
                    ]
                }
            ]
        },
        {
            width: 400,
            label: '备注信息',
            prop: 'name',
            filter: 'common',
            html(scoped) {
                return `<div>
                <h2>${scoped.row.name}这是自定义html</h2>
                <button>按钮</button>
              </div>`
            }
        }
    ])
}

export const pager = {
    pageNo: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40]
}