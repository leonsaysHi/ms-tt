export default {
  methods: {
    joinPlaylist(userId, playlistId) {
      return new Promise((res, rej) => {
        if (!userId || !playlistId) rej({ message: 'Missing argument.' })
        var playlistRef = window.db.collection("playlists").doc(playlistId)
        playlistRef.get().then((doc) => {
            if (doc.exists) {
              const
                payload = doc.data(),
                uid = userId
              payload.users.push(uid)
              playlistRef.update(payload)
                .then(() => {
                  res()
                })
                .catch((error) => {
                  rej({ message: 'Error', error })
                });
            } else {
              rej({ message: 'Can not find playlist' })
            }
        }).catch((error) => {
          rej(error);
        })
      })
    },
  }
};
