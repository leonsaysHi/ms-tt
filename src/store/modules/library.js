export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: [],
    queue: [],
    control: {
      currentItem: null,
    },
  },
  mutations: {
    reset(state) {
      state.rows = []
      state.queue = []
      state.control.currentItem = null
    },
    setRows(state, list) {
      state.rows = list || []
    },
    pushToRows(state, item) {
      state.rows.unshift(item)
    },
    popFromRows(state, video_id) {
      const rowIdx = state.rows.findIndex(v => v.video_id === video_id)
      state.rows.splice((rowIdx-1), 1)
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
  },
};
