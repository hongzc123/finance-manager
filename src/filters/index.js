import { dataMap } from '@/conf/UI_fields'
import { formatDate } from '@/utils'

export default {
    install(Vue) {

        // 日期转换
        Vue.filter('convertDate', formatDate)

        // 兼容两类过滤器
        Vue.filter('common', function(val, name) {
            const res = dataMap?.[name]?.[val] ?? val
            return res
        })

        for(let key in dataMap) {
            // console.log('key:', key)
            Vue.filter(key, function(val, ...props) {
                const data = dataMap[key]
                // console.log('data:', data)
                // console.log('val:', val)
                // console.log('data[val]:', data[val])
                return data[val]
            })
        }
    }
}