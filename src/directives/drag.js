export default {
    name: 'drag',
    // 指令生命周期
    // 初始
    bind() { },
    // 保证有父元素
    inserted(el, binding, vnode) {
        // console.log(el, binding, '我是指令')
        let selector = binding.value
        if (selector) {
            el = el.querySelector(selector)
        }

        // 鼠标手掌
        el.style.cursor = 'grab'
        // 超出隐藏
        el.style.overflow = 'hidden'
        // 关闭文字可选
        el.style.userSelect = 'none'

        // 鼠标点击事件
        el.onmousedown = function (e) {
            // console.log('点击中', e)
            const prevScrollLeft = el.scrollLeft
            const start = e.clientX
            // 鼠标移动事件(让移动范围更大)
            document.onmousemove = function (m) { // document解决移出屏幕的问题
                // console.log('移动中', m)
                const end = m.clientX
                // 结束点-开始点
                const offset = start - end
                // 改变scrollLeft
                el.scrollLeft = prevScrollLeft + offset
            }
            // 鼠标抬起事件
            document.onmouseup = function () {
                // 解除鼠标移动事件
                document.onmousemove = null
                // 解除鼠标抬起事件
                document.onmouseup = null
            }
        }

    },
    // 自身更新
    update() { },
    // 自身及子node更新
    componentUpdated() { },
    // 解绑销毁
    unbind(el) {
        el.onmousedown = null
    },
}