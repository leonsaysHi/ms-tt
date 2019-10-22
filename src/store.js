export default {
  strict: true,
  state: {
    library: [
      { video_id: "S6Ib57K0Q1c", title: "Si si" },
      { video_id: "EbdRyar3g1Q", title: "Si Te Vas" },
      { video_id: "eOAmA5iy4ds", title: "Subiendo" },
      { video_id: "kIjhRmj_-00", title: "Tu tu" },
    ],
    queue: [],
    control: {
      currentItem: null,
    }
  },
  mutations: {
    pushToLibrary(state, { video_id, title }) {
      this.state.library.push({ video_id, title })
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
  }
};
