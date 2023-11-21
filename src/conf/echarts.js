export const option1 = {
    title: {
        text: '年度电信诈骗总览'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['报案数', '受害人数', '在逃人员', '嫌疑人员']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '报案数',
            type: 'line',
            data: [26497, 28102, 31909, 28347
                , 30456, 28567, 30980, 29816
                , 27103, 31529, 32222, 32403],
            smooth: true
        },
        {
            name: '受害人数',
            type: 'line',
            data: [29744, 37844, 56843, 44560,
                53620, 35281, 32145, 41301
                , 26498, 39857, 47506, 28923],
            smooth: true
        },
        {
            name: '在逃人员',
            type: 'line',
            data: [18920, 21738, 26210, 17654
                , 23589, 18730, 14961, 30482
                , 17394, 29073, 22718, 11783],
            smooth: true
        },
        {
            name: '嫌疑人员',
            type: 'line',
            data: [28935, 23456, 31247, 25473
                , 16789, 28891, 19756, 34329
                , 22157, 27698, 18923, 22179],
            smooth: true
        },
    ]
};

export const option2 = {
    title: {
        text: '年度电信诈骗待办'
    },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    legend: {
        data: ['报案数', '在逃人员']
    },
    tooltip: {
        trigger: 'axis'
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '报案数',
            data: [2649, 2810, 3190, 2834, 2856, 2981
                , 3152, 3222, 2973, 3240, 3045, 3098, 2710],
            type: 'bar'
        }, {
            name: '在逃人员',
            data: [1890, 2178, 2620, 1754, 1830, 3082
                , 2218, 1178, 2589, 1461, 1734],
            type: 'bar'
        }
    ]
};