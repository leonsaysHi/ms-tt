import firebase from 'firebase'
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
    setLibrary(state, list) {
      state.rows = list
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
    saveRow({ commit, rootState }, { video_id, title }) {
      const payload = {
        title,
        user_uid: rootState.User.user.uid,
        date: new Date().getTime(),
      }
      commit('pushToRows', { ...payload, video_id, isWorking: true })
      firebase.database().ref('tunes/' + video_id).set(
        payload,
        function(error) {
          if (error) {
            commit('rowErrored', video_id)
          } else {
            commit('rowSaved', video_id)
          }
        }
      );
    },
    deleteRow(context, video_id) {
      firebase.database().ref('tunes/' + video_id).remove()
    },
    getRows({ commit }, { group_id }) {
      const tunesRef = firebase.database().ref('tunes').equalTo(group_id, 'group_id').orderByChild('date');
      tunesRef.once('value', function(snapshot) {
        const tunes = []
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          var val = childSnapshot.val();
          tunes.push({
            video_id: key,
            ...val,
          })
        })
        commit('setLibrary', tunes)
      });
      tunesRef.on('child_removed', function(data) {
        commit('popFromRows', data.video_id)
      });
    },
  },
};
