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