import firebase from 'firebase'
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    error: null,
    user: {
      uid: "xKx1RNmIfNcLT4XqUh3IZ3jlOkx1" //"yG2OtYEEvRP8emQeyhmnmKWeCjj1"
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    logout (state) {
      state.user = null
    }
  },
  actions: {
    signUp ({ commit }, payload) {
      commit('setStatus', 'loading')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success')
          // response will have user
          // user will have uid will be updated to the state
          commit('setUser', response.user)
          commit('setError', null)
        })
        .catch((error) => {
          commit('setError', error.message)
        })
    },
    login ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user)
          commit('setError', null)
        })
        .catch((error) => {
          commit('setError', error.message)
        })
    },
    logout: function({ commit }) {
      firebase.auth().signOut().then(() => {
        commit('logout')
      })
    },
  },
};
