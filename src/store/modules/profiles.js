export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: {},
  },
  mutations: {
    addRow(state, { uid, row }) {
      const rows = _.assign({}, state.rows)
      rows[uid] = row
      state.rows = rows
    },
  },
  actions: {
    getRow({ commit }, uid) {
      window.db.collection("users").doc(uid)
        .get().then(function(doc) {
          if (doc.exists) {
            commit('addRow', { uid, row: doc.data() })
          } else {
            window.console.log("No such user!");
          }
        }).catch(function(error) {
          window.console.log("Error getting document:", error);
        });
    }
  },
};
