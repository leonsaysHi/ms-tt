export default {
  methods: {
    addTune(id, tune) {
      const
        { video_id } = tune,
        tunesRef = window.db.collection("playlists").doc(id).collection('tunes'),
        docRef = tunesRef.doc(video_id)
      return new Promise((res, rej) => {
          docRef.get().then((doc) => {
          if (doc.exists) {
            this.$bvToast.toast('"' + tune.title + '" already exist in this playlist', {
              title: 'Can\'t add video',
              variant: 'warning',
              solid: true,
              appendToast: true,
            })
            rej(doc)
          } else {
            docRef.set(tune)
            res(tune)
          }
        })
      })
    },
  }
};
