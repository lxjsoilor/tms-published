// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import Mixin from 'mixin/index'
import 'vant/lib/index.css'
import 'common/style/reset.css'
import 'common/style/animated.css'
import Ripple from 'vue-ripple-directive'
Ripple.color = 'rgba(0, 0, 0, 0.15)'

window.addEventListener('popstate', function (e) {
  router.isBack = true
}, false)

// eslint-disable-next-line
import VConsole from 'vconsole' //import vconsole
// eslint-disable-next-line
if(process.env.NODE_ENV === 'development') {
// eslint-disable-next-line
  new VConsole() // 初始化
}

Vue.config.productionTip = false

Vue.use(Vant)
Vue.mixin(Mixin)
Vue.directive('ripple', Ripple)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
