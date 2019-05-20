// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import {Icon} from 'element-ui'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
import $ from "jquery";

Vue.use(Share)

Vue.use(ElementUI);
//是滚动条默认在顶部 
/*router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
