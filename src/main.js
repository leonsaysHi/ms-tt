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
  storageBucket: 'ms-turn-table.web.app/',
});
window.db = window.firebase.firestore();

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(VueYoutube);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* Icons */
// https://dev.materialdesignicons.com/icons
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue';
import Close from 'vue-material-design-icons/Close.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import Play from 'vue-material-design-icons/Play.vue';
import PlusThick from 'vue-material-design-icons/PlusThick.vue';
import Repeat from 'vue-material-design-icons/Repeat.vue';
import RepeatOff from 'vue-material-design-icons/RepeatOff.vue';
import RepeatOnce from 'vue-material-design-icons/RepeatOnce.vue';
import Share from 'vue-material-design-icons/Share.vue';
import SkipNext from 'vue-material-design-icons/SkipNext.vue';
import Stop from 'vue-material-design-icons/Stop.vue';

Vue.component('account-group-icon', AccountGroup);
Vue.component('close-icon', Close);
Vue.component('dots-vertical-icon', DotsVertical);
Vue.component('heart-icon', Heart);
Vue.component('heart-outline-icon', HeartOutline);
Vue.component('play-icon', Play);
Vue.component('plus-thick-icon', PlusThick);
Vue.component('repeat-icon', Repeat);
Vue.component('repeat-off-icon', RepeatOff);
Vue.component('repeat-once-icon', RepeatOnce);
Vue.component('share-icon', Share);
Vue.component('skip-next-icon', SkipNext);
Vue.component('stop-icon', Stop);

/* Components */
Vue.component('display-name', require('./components/DisplayName.vue').default)

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
