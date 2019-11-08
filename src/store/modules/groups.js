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
    setCurrent(state, group_id) {
      state.currentId = group_id || null
    },
    setGroups(state, rows) {
      state.rows = [ ...rows ]
    },
    pushToRows(state, item) {
      state.rows.push(item)
    },
    popFromRows(state, id) {
      const rowIdx = state.rows.findIndex(v => v.id === id)
      state.rows.splice((rowIdx-1), 1)
    },
    rowErrored(state, group_id) {
      let
        rowIdx = state.rows.findIndex(v => v.video_id === group_id),
        row = { ...state.rows[rowIdx] }
      delete row.isWorking
      row.isError = true
      state.rows.splice(rowIdx, 1, row)
    },
    rowSaved(state, group_id) {
      let
        rowIdx = state.rows.findIndex(v => v.group_id === group_id),
        row = { ...state.rows[rowIdx] }
      delete row.isWorking
      row.isSaved = true
      state.rows.splice(rowIdx, 1, row)
    },
  },
  getters: {
    currentGroup(state) {
      if (!_.isArray(state.rows) || !state.currentId) {
        return null
      }
      return state.rows.find(g => g.group_id === state.currentId) || null
    },
    otherGroups(state) {
      if (!_.isArray(state.rows) || !state.currentId) {
        return []
      }
      return state.rows.filter(g => g.group_id !== state.currentId)
    }
  },
  actions: {
  },
};
