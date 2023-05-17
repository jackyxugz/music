import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

import PubFn from 'common/js/utils.js'
Vue.prototype.$pubFn = PubFn;

const app = new Vue({
    ...App
})
app.$mount()
