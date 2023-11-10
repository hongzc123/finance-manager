export default {
    title: '个人信息',
    items: [
        [
            {
                label: '姓名',
                type: 'text',
                key: 'username',
                val: '123',
                colspan: 12,
                attrs: {
                    placeholder: '请输入姓名'
                }
            },
            {
                label: '出生日期',
                type: 'timepicker',
                key: 'date',
                val: '',
                colspan: 12,
                attrs: {
                    placeholder: '请选择出生日期'
                }
            }
        ], // 一行
        []
    ]
}