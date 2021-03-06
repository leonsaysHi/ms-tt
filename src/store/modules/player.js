const defsControl = () => ({
    current: null,
    isReady: false,
    isPlaying: false,
    isPaused: false,
})
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    ...defsControl()
  },
  mutations: {
    setReady(state) {
      state.isReady = true
    },
    setError(state) {
      state.isReady = false
    },
    play(state, tune = null) {
      if (tune) {
        state.current = tune
      }
      if (state.current) {
        state.isPlaying = true
        state.isPaused = false
      }
    },
    pause(state) {
      state.isPaused = true
    },
    stop(state) {
      state.isPlaying = false
      state.isPaused = false
    },
    refreshCurrent(state, tune = null) {
      if (tune && state.current.video_id === tune.video_id) {
        state.current = tune
      }
    },
  },
  getters: {
  },
  actions: {
    refreshCurrent({ commit, state, rootState }) {
      if (!state.current) return
      const tune = rootState.Library.rows.find(r => r.video_id === state.current.video_id)
      commit('refreshCurrent', tune)
    }
  },
};
