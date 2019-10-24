window._ = require('lodash');
window.axios = require('axios');

import firebase from 'firebase';
import Vue from "vue";
import VueYoutube from "vue-youtube";
import Vuex from "vuex";
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store/index.js'

firebase.initializeApp({
  apiKey: "AIzaSyC8_oLEhspnHIrNMZLDb0ALlB_wluc_NhE",
  authDomain: "ms-turn-table.firebaseapp.com",
  databaseURL: "https://ms-turn-table.firebaseio.com",
  projectId: "ms-turn-table",
  storageBucket: "ms-turn-table.appspot.com",
  messagingSenderId: "180128494081",
  appId: "1:180128494081:web:4e3abaa2b00bec517ac600",
  measurementId: "G-HHCG4KZ50T"
})

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(VueYoutube);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* Directives */
Vue.directive('time', require('./directives/formatTime.js').default);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
