import firebase from 'firebase'
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: { uid: null, isFullyLoaded: false }
  },
  mutations: {
    setUser (state, payload) {
      if (_.get(payload, 'uid')) { // from auth
        const { uid, email } = payload
        state.user = { ...state.user, uid, email }
      }
      else { // from database
        state.user = { ...state.user, ...payload, isFullyLoaded: true }
      }
    },
    deleteUser (state) {
      state.user = null
    },
  },
  getters: {
    isLogged(state) {
      return _.get(state.user, 'uid') && state.user.uid
    },
    uid(state) {
      return _.get(state.user, 'uid', null)
    }
  },
  actions: {
    signUpAction ({ commit }, payload) {
      commit('setStatus', 'loading')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success')
          // response will have user
          // user will have uid will be updated to the state
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    signInAction ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    signOutAction ({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
  },
};
