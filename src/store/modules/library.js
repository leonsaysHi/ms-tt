const defaultFilter = () => ({
  player: null,
  upvoted: false,
  upvotedByMe: false,
})

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isWorking: true,
    rows: [],
    shuffle: [],
    repeatAll: false,
    repeatOne: false,
    filter: defaultFilter(),
  },
  mutations: {
    reset(state) {
      state.isWorking = false
      state.rows = []
      state.shuffle = null
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
    toggleShuffle(state) {
      state.shuffle = _.isArray(state.shuffle) ? null : _.shuffle(state.rows.map( (r, idx) => idx))
    },
    gettingRows(state) {
      state.isWorking = true
    },
    setRows(state, list) {
      state.rows = list
      state.shuffle = null
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
    queue(state, getters, rootState, rootGetters) {
      const uid = rootGetters['User/uid']
      const order = state.shuffle || state.rows.map( (r, idx) => idx)
      const filtered = order.reduce( (acc, curr) => {
        const r = state.rows[curr]
        // apply filters
        if (state.filter.player && r.uid !== state.filter.player) return acc
        const
          isUpvoted = (r.votes && r.votes.length > 0),
          isUpvotedByMe = isUpvoted && r.votes.includes(uid)
        if (
          ((state.filter.upvoted || state.filter.upvotedByMe) && !isUpvoted)
          || (state.filter.upvotedByMe && !isUpvotedByMe)
        ) return acc
        acc.push(r)
        return acc
      }, [])
      return filtered
    },
    isFiltered(state) {
      let diff = false
      _.forOwn(defaultFilter(), function(value, key) {
        diff = diff || _.get(state.filter, key) !== value
      })
      return diff
    },
    isShuffled(state) {
      return _.isArray(state.shuffle)
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
