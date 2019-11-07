import User from './modules/user.js';
import Groups from './modules/groups.js';
import Profiles from './modules/profiles.js';
import Library from './modules/library.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Groups,
    Profiles,
    Library,
  }
});
