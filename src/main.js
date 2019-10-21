import Vue from "vue";
import App from "./App.vue";
import VueYoutube from "vue-youtube";
import Vuex from "vuex";
import store from "./store";

Vue.use(VueYoutube);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store: new Vuex.Store(store)
}).$mount("#app");
