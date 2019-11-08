export default {
  methods: {
    removeTune(id, tune) {
      return new Promise((res, rej) => {
        window.db.collection("playlists").doc(id).collection("tunes").doc(tune.video_id).delete()
        .then(function() {
          res(tune)
        }).catch((error) => {
          this.$bvToast.toast('Could not remove "' + tune.title + '" from this playlist', {
            title: 'Error',
            variant: 'warning',
            solid: true,
            appendToast: true,
          })
          rej(error)
        })
      })
    },
  }
};
