window._ = require('lodash');
window.axios = require('axios');

import Vue from "vue";
import App from "./App.vue";
import VueYoutube from "vue-youtube";
import Vuex from "vuex";
import store from "./store";

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

Vue.use(VueYoutube);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* Directives */
Vue.directive('time', require('./directives/formatTime.js').default);

new Vue({
  render: h => h(App),
  store: new Vuex.Store(store)
}).$mount("#app");
