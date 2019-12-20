const defsControl = () => ({
    currentVideoId: null,
    isPlaying: false,
    repeatAll: false,
    repeatOne: false,
})
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isWorking: true,
    rows: [],
    control: defsControl()
  },
  mutations: {
    reset(state) {
      state.rows = []
      state.control = defsControl()
    },
    setRows(state, list) {
      state.rows = list
      state.isWorking = false
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
      state.control = { ...state.control, currentVideoId: state.rows[idx].video_id }
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
      return state.control.currentVideoId ? state.rows.find(v => v.video_id === state.control.currentVideoId) : null
    },
    currentIdx(state) {
      return state.control.currentVideoId ? state.rows.findIndex(v => v.video_id === state.control.currentVideoId) : null
    },
    isPlaying(state) {
      return state.control.isPlaying
    },
  },
  actions: {
    handleEnded({ state, getters, dispatch, commit }) {
      const
        currentItemIdx = getters.currentIdx
      const idxMax = state.rows.length - 1
      console.log('handleEnded')
      if (state.control.repeatAll || currentItemIdx < idxMax) {
        dispatch('skip')
      }
      else {
        commit('stop')
      }
    },
    togglePlay({ commit, dispatch, state, getters }) {
      if (state.control.isPlaying) {
        commit('stop')
        return
      }
      if (!getters.currentIdx) {
        dispatch('skip')
      }
      commit('play')
    },
    skip({ commit, getters, state }, moveIdx = 1) {
      const
        currentItemIdx = getters.currentIdx || -1
      let idx = currentItemIdx + moveIdx
      const idxMax = state.rows.length - 1
      if (idx < 0) { idx = idxMax }
      if (idx > idxMax) { idx = 0 }
      commit('skip', idx)
    },
    skipTo({ commit, state }, row) {
      let idx = state.rows.findIndex( item => item.video_id == row.video_id )
      commit('skip', idx)
    },
    toggleRepeat({ state, commit }) {
      if (state.control.repeatAll) { commit('setRepeatOne') }
      else if (state.control.repeatOne) { commit('setRepeatOff') }
      else { commit('setRepeatAll') }
    }
  },
};
