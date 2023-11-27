import { deepClone } from '@/utils'
import Vue from 'vue'

export const getValueFormConf = (items, dataObj) => {
    const innerItems = deepClone(items)

    innerItems.forEach(rowArr => {
        rowArr.forEach(item => {
            let key = item.key
            if (dataObj[key]) {
                item.value = dataObj[key]
            }
            if (key === "birthday") {
                const filter = Vue.filter('convertDate')
                item.value = filter(dataObj[key])
            }
        })
    })
    return innerItems
}