import drag from './drag'

export default {
    install(Vue) {
        Vue.directive(drag.name, drag)
    }
}