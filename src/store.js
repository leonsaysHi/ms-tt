export default {
  strict: true,
  state: {
    library: [
      { id: "1", videoId: "S6Ib57K0Q1c", title: "Si si" },
      { id: "2", videoId: "EbdRyar3g1Q", title: "Si Te Vas" },
      { id: "3", videoId: "eOAmA5iy4ds", title: "Subiendo" }
    ],
    queue: [],
    control: {
      currentItem: null,
    }
  },
  mutations: {
    pushToQueue(state, item) {
      state.queue.push(item);
      if (state.queue.length === 1) {
        state.control.currentItem = item;
      }
    },
    removeFromQueue(state, item) {
      state.queue = state.queue.filter(i => i.id !== item.id);
      const { currentItem } = state.control
      if (item.id === currentItem.id) {
        state.control.currentItem = state.queue[0];
      }
    },
    playQueue(state) {
      state.control.currentItem = state.queue[0];
    },
  }
};
