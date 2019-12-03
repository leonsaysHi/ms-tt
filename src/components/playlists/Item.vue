<template>
  <div class="d-md-flex align-items-center justify-content-between">
    <strong>{{ item.title }}</strong>
    <div class="ml-auto my-2 my-md-0"><code class="p-1 border rounded">{{ item.id }}</code></div>
    <b-button class="ml-md-2" :disabled="isWorking" variant="danger" @click="quitPlaylist">Remove</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['item'],
  data() {
    return {
      isWorking: false,
      isQuitingError: null,
    }
  },
  async mounted () {
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
  },
  methods: {
    quitPlaylist() {
      this.isQuitingError = null
      var playlistRef = window.db.collection("playlists").doc(this.item.id)
      playlistRef.get().then((doc) => {
          if (doc.exists) {
            const
              payload = doc.data(),
              userId = this.userId
            payload.users = payload.users.filter( u => u !== userId)
            if (payload.users.length) {
              playlistRef.update(payload)
                .then(() => {
                  this.isWorking = false
                })
                .catch((error) => {
                  this.isQuitingError = { message: 'Error', error }
                  this.isWorking = false
                })
            }
            else {
              playlistRef.delete()
                .then(() => {
                  this.isWorking = false
                })
                .catch((error) => {
                  this.isQuitingError = { message: 'Error', error }
                  this.isWorking = false
                })
            }
          } else {
            this.isQuitingError = { message: 'Can not find playlist' }
            this.isWorking = false
          }
      }).catch((error) => {
        this.isQuitingError = { message: 'Error', error }
        window.console.log("Error getting document:", error);
        this.isWorking = false
      })
    },
  },
};
</script>
