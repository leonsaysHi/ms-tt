const defaultFilter = () => ({
  player: null,
  upvote: false,
})

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isWorking: true,
    rows: [],
    repeatAll: false,
    repeatOne: false,
    filter: defaultFilter(),
  },
  mutations: {
    reset(state) {
      state.isWorking = false
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
    gettingRows(state) {
      state.isWorking = true
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
    setFilter(state, payload) {
      state.filter = Object.assign({}, state.filter, payload)
    },
    resetFilter(state) {
      state.filter = defaultFilter()
    },
  },
  getters: {
    queue(state) {
      return state.rows
        .filter(r => {
          return (!state.filter.player || r.uid === state.filter.player)
            && (!state.filter.upvote || (r.votes && r.votes.length > 0))
        })
    },
    isFiltered(state) {
      let diff = false
      _.forOwn(defaultFilter(), function(value, key) {
        diff = diff || _.get(state.filter, key) !== value
      })
      return diff
    },
    next(state, getters) {
      return (row) => {
        if (getters.queue.length === 0) return null
        if (!row) return getters.queue[0]
        let idx = Number(getters.queue.findIndex( r => r.video_id === row.video_id)) + 1
        if (idx > getters.queue.length - 1) { idx = state.repeatAll ? 0 : null }
        return getters.queue[idx] || null
      }
    },
  },
  actions: {
  },
};
