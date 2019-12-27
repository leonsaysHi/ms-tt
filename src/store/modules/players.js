export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: [],
  },
  mutations: {
    addRow(state, { uid, row }) {
      if (!state.rows.find(r => r.uid === uid)) {
        state.rows.push({ uid, ...row })
      }
    },
  },
  actions: {
    getRow({ commit }, uid) {
      if (!uid) return
      window.db.collection("users").doc(uid)
        .get().then(function(doc) {
          if (doc.exists) {
            commit('addRow', { uid, row: doc.data() })
          }
        }).catch(function(error) {
          window.console.log("Error getting document:", error);
        });
    }
  },
};
