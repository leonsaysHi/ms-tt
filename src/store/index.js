import Profile from './modules/profile.js';
import Users from './modules/users.js';
import Groups from './modules/groups.js';
import Library from './modules/library.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Profile,
    Users,
    Groups,
    Library,
  }
});
