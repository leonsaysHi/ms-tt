import User from './modules/user.js';
import Library from './modules/library.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Library,
  }
});
