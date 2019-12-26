export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isWorking: true,
    rows: [],
    repeatAll: false,
    repeatOne: false,
  },
  mutations: {
    reset(state) {
      state.rows = []
    },
    toggleRepeat(state) {
      if (state.repeatAll) {
        state.repeatAll = false
        state.repeatOne = true
      }
      else if (state.repeatOne) {
        state.repeatAll = false
        state.repeatOne = false
      }
      else {
        state.repeatAll = true
        state.repeatOne = false
      }
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
    playbackError(state, row) {
      let idx = Number(state.rows.findIndex( r => r.video_id === row.video_id))
      if (idx > -1) { state.rows[idx].error = true }
    },
  },
  getters: {
    queue(state) {
      return state.rows
    },
    next(state) {
      return (row) => {
        if (state.rows.length === 0) return null
        if (!row) return state.rows[0]
        let idx = Number(state.rows.findIndex( r => r.video_id === row.video_id)) + 1
        if (idx > state.rows.length - 1) { idx = state.repeatAll ? 0 : null }
        return state.rows[idx] || null
      }
    },
  },
  actions: {
  },
};
