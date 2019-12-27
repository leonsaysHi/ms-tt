export default {
  methods: {
    saveUserDoc(id, data) {
      const
        userRef = window.db.collection("users").doc(id)
      return new Promise((res) => {
        userRef.get().then((doc) => {
          if (doc.exists) {
            userRef.update(data)
              .then(() => {
                res(data)
              })
          } else {
            userRef.set(data)
            res(data)
          }
        })
      })
    },
  }
};
