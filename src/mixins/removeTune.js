export default {
  methods: {
    removeTune(group_id, tune) {
      return new Promise((res, rej) => {
        window.db.collection("groups").doc(group_id).collection("tunes").doc(tune.video_id).delete()
        .then(function() {
          res(tune)
        }).catch((error) => {
          this.$bvToast.toast('Could not remove "' + tune.title + '" from this group', {
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
