export default {
  methods: {
    editTune(id, tune) {
      const
        { video_id } = tune,
        tunesRef = window.db.collection("playlists").doc(id).collection('tunes'),
        docRef = tunesRef.doc(video_id)
      return new Promise((res, rej) => {
          docRef.get().then((doc) => {
          if (doc.exists) {
            docRef.set(tune)
            res(tune)
          } else {
            this.$bvToast.toast('"' + tune.title + '" does not exist', {
              title: 'Error',
              variant: 'warning',
              solid: true,
              appendToast: true,
            })
            rej(tune)
          }
        })
      })
    },
  }
};
