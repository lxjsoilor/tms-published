/* eslint-disable */
import './index.css'

let Loading = {}
// 避免重复install，设立flag
Loading.installed = false
Loading.install = function (Vue) {
  if (Loading.installed) return
  Vue.prototype.$loading = {}
  Vue.prototype.$loading.show = () => {
    // 如果页面有loading则不继续执行
    if (document.querySelector('#vue-loading')) return
    // 1、创建构造器，定义loading模板
    let LoadingTip = Vue.extend({
      template: `<div id="vue-loading" class="wrapper" @click.stop>
                  <div class="truck-wrapper">
                    <div class="truck">
                      <div class="truck-container"></div>
                      <div class="glases"></div>
                      <div class="bonet"></div>
                      <div class="base"></div>
                      <div class="base-aux"></div>
                      <div class="wheel-back"></div>
                      <div class="wheel-front"></div>
                      <div class="smoke"></div>
                    </div>
                  </div>
                </div>`
    })
    // 2、创建实例，挂载到文档以后的地方
    let tpl = new LoadingTip().$mount().$el
    // 3、把创建的实例添加到body中
    document.body.appendChild(tpl)
    // 阻止遮罩滑动
    // document.querySelector('#vue-loading').addEventListener('touchmove', function (e) {
    //   e.stopPropagation()
    //   e.preventDefault()
    // })
    Loading.installed = true
  }
  Vue.prototype.$loading.hide = () => {
    let tpl = document.querySelector('#vue-loading')
    document.body.removeChild(tpl)
  }
}
export default Loading
