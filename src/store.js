import firebase from 'firebase'

export default {
  strict: true,
  state: {
    library: [],
    queue: [],
    control: {
      currentItem: null,
    },
    user: {
      uid: "yG2OtYEEvRP8emQeyhmnmKWeCjj1"
    },
  },
  mutations: {
    // User
    setUser (state, payload) {
      state.user = payload
    },
    removeUser (state) {
      state.user = null
    },
    // Lib
    setLibrary(state, list) {
      this.state.library = list
    },
    pushToLibrary(state, { video_id, title }) {
      this.state.library.push({ video_id, title })
    },
    pushToQueue(state, item) {
      state.queue.push(item);
      if (state.queue.length === 1) {
        state.control.currentItem = item;
      }
    },
    removeFromQueue(state, item) {
      state.queue = state.queue.filter(i => i.video_id !== item.video_id);
      const { currentItem } = state.control
      if (item.video_id === currentItem.video_id) {
        state.control.currentItem = state.queue[0];
      }
    },
    playQueue(state) {
      state.control.currentItem = state.queue[0];
    },
  },
  actions: {
    // User
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
    // Lib
    getLibrary(context) {
      const tunesRef = firebase.database().ref('tunes');
      tunesRef.once('value', function(snapshot) {
        const tunes = []
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          var val = childSnapshot.val();
          tunes.push({
            ...val,
            uid: key
          })
        })
        context.commit('setLibrary', tunes)
      });
    }
  }
};
