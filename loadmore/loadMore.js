/* eslint-disable no-console */
let Loadmore = {
  install: function (Vue) {
    // 注册一个全局自定义指令 `v-loadmore`
    Vue.directive('loadmore', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: (el, binding) => {
        // 没有回调，执行了没任何作用
        if (!binding.value || !binding.value.callback) return

        // 滚动内容小于实际高度，不需要此事件
        if (el.clientHeight >= el.scrollHeight) return

        // 节流
        const throttle = (delay, interval, fn) => {
          let startTime = new Date().getTime();
          let timer = null;
          return function () {
            let curTime = new Date().getTime();
            clearTimeout(timer);
            if (curTime - startTime >= interval) {
              // fn.apply(this, ...arguments)
              fn && fn()
              startTime = curTime
            }
            else {
              timer = setTimeout(fn, delay)
            }
          }
        }

        const { callback, delay, interval } = binding.value
        el.onscroll = throttle(delay || 0, interval || 100, () => {
          if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            callback && callback()
          }
        })

      },
      componentUpdated: (el, binding) => {
        // 完成之后覆盖监听事件
        if (binding.value.finish) {
          el.onscroll = () => { }
        }
      }
    })
  }
}
export default Loadmore