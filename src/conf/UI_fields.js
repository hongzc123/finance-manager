// table内置过滤功能要求属性名与过滤器子名称一致
export const dataMap = {
    // 测试
    name:{
       Niko:'尼克' 
    },
    sex: {
        man: '男',
        woman: '女'
    },
    education: {
        college: '大学',
        highschool: '高中'
    },
    status: [
        '暂未提交',
        '正在审批',
        '已受理',
        '证据不足',
        '正在办理',
        '督办中',
        '无法执行',
        '已结案'
    ],
    statusColor: [
        'info',
        '',
        'success',
        'info',
        '',
        'warning',
        'danger',
        'success'
    ],
    role_name:{
        input:'录入专员',
        administrator:'管理员',
        approve:'审批专员'
    },
    fileText:[
        '未生成备案文件','未生成备案文件','未生成备案文件','未生成备案文件','未生成备案文件',
        '已生成备案文件','已生成备案文件','已生成备案文件','已生成备案文件','已生成备案文件'
        
    ],
    fileColor:[
        'primary','primary','primary','primary','primary',
        'success','success','success','success','success'
    ]

}

//性别
export const sexOptions = [
    { value: "man", text: "男" },
    { value: "woman", text: "女" }
];
//行业
export const companyOptions = [
    { value: "education", text: "教育" },
    { value: "finance", text: "金融" }
];
//婚否
export const marriageOptions = [
    { value: "married", text: "已婚" },
    { value: "unmarried", text: "未婚" }
];
//学历
export const educationOptions = [
    { value: "college", text: "大学" },
    { value: "highschool", text: "高中" }
];