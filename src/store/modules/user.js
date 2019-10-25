import firebase from 'firebase'
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      uid: "xKx1RNmIfNcLT4XqUh3IZ3jlOkx1" //"yG2OtYEEvRP8emQeyhmnmKWeCjj1"
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    deleteUser (state) {
      state.user = null
    },
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
