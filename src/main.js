window._ = require('lodash');
window.axios = require('axios');

const firebase = require("firebase");
require("firebase/firestore");

import Vue from "vue";
import VueYoutube from "vue-youtube";
import Vuex from "vuex";
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store/index.js'

firebase.initializeApp({
  apiKey: "AIzaSyC8_oLEhspnHIrNMZLDb0ALlB_wluc_NhE",
  authDomain: "ms-turn-table.firebaseapp.com",
  projectId: "ms-turn-table",
});
window.db = firebase.firestore();

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(VueYoutube);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* Directives */
Vue.directive('time', require('./directives/formatTime.js').default);

let app = '';
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
    const { displayName, email, uid } = user
    app.$store.commit('User/setUser', { displayName, email, uid })
    app.$store.dispatch('Groups/getRows')
  }
  else if (!user){
    router.replace('login')
  }
});
