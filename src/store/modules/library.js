export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: [],
    votes: [],
    control: {
      currentRow: null,
      isPlaying: false,
      repeatAll: false,
      repeatOne: false,
    },
  },
  mutations: {
    reset(state) {
      state.rows = []
      state.control.currentRow = null
    },
    setRows(state, list) {
      state.rows = list
    },
    setVotes(state, votes) {
      state.votes = votes || []
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
      state.control = { ...state.control, currentRow: _.assign({}, state.rows[idx]) }
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
      return state.control.currentRow
    },
    isPlaying(state) {
      return state.control.isPlaying
    },
  },
  actions: {
    handleEnded({ state, dispatch, commit }) {
      const
        currentRow = state.control.currentRow,
        currentItemIdx = state.rows.findIndex(v => v.video_id === currentRow.video_id)
      const idxMax = state.rows.length - 1
      console.log('handleEnded')
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
      commit('play')
    },
    skip({ commit, state }, moveIdx = 1) {
      const
        currentRow = state.control.currentRow,
        currentItemIdx = state.rows.findIndex(v => v.video_id === currentRow.video_id)
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
