import Vue from 'vue'
import store from './vuex/'
import router from './router/'
import VueResource from 'vue-resource'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import App from './App'

Vue.use(MuseUI)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
