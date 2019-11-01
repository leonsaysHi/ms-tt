window._ = require('lodash');
window.axios = require('axios');

window.firebase = require("firebase");
require("firebase/firestore");

import Vue from "vue";
import VueYoutube from "vue-youtube";
import Vuex from "vuex";
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store/index.js'

window.firebase.initializeApp({
  apiKey: "AIzaSyC8_oLEhspnHIrNMZLDb0ALlB_wluc_NhE",
  authDomain: "ms-turn-table.firebaseapp.com",
  projectId: "ms-turn-table",
});
window.db = window.firebase.firestore();

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(VueYoutube);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* Directives */
Vue.directive('time', require('./directives/formatTime.js').default);

let app = '';
window.firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
  else if (!user){
    router.replace('login')
  }
});
