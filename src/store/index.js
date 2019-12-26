import User from './modules/user.js';
import Playlists from './modules/playlists.js';
import Player from './modules/player.js';
import Players from './modules/players.js';
import Library from './modules/library.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Playlists,
    Player,
    Players,
    Library,
  }
});
