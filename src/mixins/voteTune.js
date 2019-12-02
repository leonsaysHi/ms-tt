export default {
  methods: {
    voteTune(id, tuneId, uid) {
      const
        tuneRef = window.db.collection("playlists").doc(id).collection('tunes').doc(tuneId)
      return new Promise((res, rej) => {
          tuneRef.get().then((doc) => {
          if (doc.exists) {
            const
              payload = doc.data(),
              uidIdx = payload.votes ? payload.votes.findIndex(vUid => vUid === uid) : null
            if (_.isNull(uidIdx)) {
              payload.votes = [ uid ]
            }
            else if (uidIdx === -1) {
              payload.votes.push( uid )
            }
            else if (uidIdx > -1) {
              payload.votes.splice(uidIdx, 1)
            }
            tuneRef.update(payload)
              .then(() => {
                res()
              })
          } else {
            rej()
          }
        })
      })
    },
  }
};
