export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: [],
    control: {
      currentItemIdx: null,
      isPlaying: false,
      repeatAll: false,
      repeatOne: false,
    },
  },
  mutations: {
    reset(state) {
      state.rows = []
      state.control.currentItemIdx = null
    },
    setRows(state, list) {
      state.rows = list || []
      if (!state.control.currentItemIdx || !state.rows[state.control.currentItemIdx]) state.control.currentItemIdx = 0
    },
    rowErrored(state, video_id) {
      let
        rowIdx = state.rows.findIndex(v => v.video_id === video_id),
        row = { ...state.rows[rowIdx] }
      delete row.isWorking
      row.isError = true
      state.rows.splice(rowIdx, 1, row)
    },
    rowSaved(state, video_id) {
      let
        rowIdx = state.rows.findIndex(v => v.video_id === video_id),
        row = { ...state.rows[rowIdx] }
      delete row.isWorking
      row.isSaved = true
      state.rows.splice(rowIdx, 1, row)
    },
    play(state) {
      state.control = { ...state.control, isPlaying: true }
    },
    skip(state, idx) {
      state.control = { ...state.control, currentItemIdx: idx }
    },
    stop(state) {
      state.control = { ...state.control, isPlaying: false }
    },
    setRepeatAll(state) {
      state.control = { ...state.control, repeatAll: true, repeatOne: false }
    },
    setRepeatOne(state) {
      state.control = { ...state.control, repeatAll: false, repeatOne: true }
    },
    setRepeatOff(state) {
      state.control = { ...state.control, repeatAll: false, repeatOne: false }
    }
  },
  getters: {
    queue(state) {
      return state.rows
    },
    current(state) {
      return _.isNumber(state.control.currentItemIdx) && _.get(state.rows, state.control.currentItemIdx) ? state.rows[state.control.currentItemIdx] : null
    },
    isPlaying(state) {
      return state.control.isPlaying
    },
  },
  actions: {
    handleEnded({ state, getters, dispatch, commit }) {
      const currentItemIdx = state.control.currentItemIdx
      const idxMax = getters.queue.length - 1
      window.console.log('handleEnded')
      if (state.control.repeatAll || currentItemIdx < idxMax) {
        dispatch('skip')
      }
      else {
        commit('stop')
      }
    },
    togglePlay({ commit, state }) {
      if (state.control.isPlaying) {
        commit('stop')
        return
      }
      commit('play', state.control.currentItemIdx)
    },
    skip({ commit, getters, state }, moveIdx = 1) {
      let idx = state.control.currentItemIdx + moveIdx
      const idxMax = getters.queue.length - 1
      if (idx < 0) { idx = idxMax }
      if (idx > idxMax) { idx = 0 }
      commit('skip', idx)
    },
    skipTo({ commit, getters }, row) {
      let idx = getters.queue.findIndex( item => item.video_id == row.video_id )
      commit('skip', idx)
    },
    toggleRepeat({ state, commit }) {
      if (state.control.repeatAll) { commit('setRepeatOne') }
      else if (state.control.repeatOne) { commit('setRepeatOff') }
      else { commit('setRepeatAll') }
    }
  },
};
