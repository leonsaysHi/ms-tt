export default {
  strict: true,
  state: {
    playlist: [
      { id: "1", videoId: "S6Ib57K0Q1c", title: "Si si" },
      { id: "2", videoId: "EbdRyar3g1Q", title: "Si Te Vas" },
      { id: "3", videoId: "eOAmA5iy4ds", title: "Subiendo" }
    ],
    queue: []
  },
  mutations: {
    pushToQueue(state, item) {
      state.queue.push(item);
    },
    removeFromQueue(state, item) {
      state.queue = state.queue.filter(i => i.id !== item.id);
    }
  }
};
