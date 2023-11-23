import { CONFIRM } from '@/conf'

export function confirmFn({msg = '是否确定该操作', title = '提示'}) {
    return this.$confirm(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
        console.log('确定')
        return true
    }).catch((err) => {
        console.log(err)
        return false
    })
}

// 向外导出一个对象，一个属性叫install函数
export default {
    install(Vue) {
        // Vue.prototype.$confirm = CONFIRM 可以覆盖
        // 定义属性
        Object.defineProperty(Vue.prototype, CONFIRM, {
            configurable: true, // 禁止再次被定义及删除属性
            set() {}, // 禁止覆盖
            get() {
                return confirmFn
            }
        })
    }
}