import firebase from 'firebase'
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    rows: [],
    current: null,
  },
  mutations: {
    setCurrent(state, group_id) {
      state.current = group_id
    },
    setRows(state, list) {
      state.rows = list
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
    currentGroup({ state }) {
      return state.rows.find(g => g.group_id = state.current)
    }
  },
  actions: {
    saveRow({ commit }, { title }) {
      const payload = {
        title,
        users: {},
        date: new Date().getTime(),
      }
      payload.users[firebase.auth().currentUser.uid] = { isOwner: true }
      const database = firebase.database();
      const ref = database.ref('groups')
      const group = ref.push()
      const group_id = group.key
      commit('pushToRows', { ...payload, group_id, isWorking: true})
      group.set(
        payload,
        function(error) {
          if (error) {
            commit('rowErrored', group_id)
          } else {
            commit('rowSaved', group_id)
          }
        }
      );
    },
    deleteRow(context, id) {
      firebase.database().ref('groups/' + id).remove()
    },
    getRows({ commit }) {
      const tunesRef = firebase.database().ref('groups').orderByChild('date');
      tunesRef.once('value', function(snapshot) {
        const rows = []
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          var val = childSnapshot.val();
          rows.push({
            group_id: key,
            ...val,
          })
        })
        commit('setRows', rows)
      });
      tunesRef.on('child_removed', function(data) {
        commit('popFromRows', data)
      });
    },
  },
};
