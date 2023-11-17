export default {
    name: 'drag',
    // 指令生命周期
    // 初始
    bind() {},
    // 保证有父元素
    inserted(el, binding, vnode) {
        console.log(el, binding, '我是指令')
        let selector = binding.value
        if (selector) {
            el = el.querySelector(selector)
        }
    },
    // 自身更新
    update() {},
    // 自身及子node更新
    componentUpdated() {},
    // 解绑销毁
    unbind() {},
}