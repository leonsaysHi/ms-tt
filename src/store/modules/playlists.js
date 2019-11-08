export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: null,
    currentId: null,
    join: {
      isWorking: false,
      isError: false,
    },
    create: {
      isWorking: false,
      isError: false,
    }
  },
  mutations: {
    setCurrent(state, id) {
      state.currentId = id || null
    },
    setPlaylists(state, rows) {
      state.rows = [ ...rows ]
    },
    pushToRows(state, item) {
      state.rows.push(item)
    },
    popFromRows(state, id) {
      const rowIdx = state.rows.findIndex(v => v.id === id)
      state.rows.splice((rowIdx-1), 1)
    },
    rowErrored(state, id) {
      let
        rowIdx = state.rows.findIndex(v => v.video_id === id),
        row = { ...state.rows[rowIdx] }
      delete row.isWorking
      row.isError = true
      state.rows.splice(rowIdx, 1, row)
    },
    rowSaved(state, id) {
      let
        rowIdx = state.rows.findIndex(v => v.id === id),
        row = { ...state.rows[rowIdx] }
      delete row.isWorking
      row.isSaved = true
      state.rows.splice(rowIdx, 1, row)
    },
  },
  getters: {
    currentPlaylist(state) {
      if (!_.isArray(state.rows) || !state.currentId) {
        return null
      }
      return state.rows.find(g => g.id === state.currentId) || null
    },
    otherPlaylists(state) {
      if (!_.isArray(state.rows) || !state.currentId) {
        return []
      }
      return state.rows.filter(g => g.id !== state.currentId)
    }
  },
  actions: {
  },
};
