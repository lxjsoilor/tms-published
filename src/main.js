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

window.addEventListener('popstate', function (e) {
  router.isBack = true
}, false)

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
