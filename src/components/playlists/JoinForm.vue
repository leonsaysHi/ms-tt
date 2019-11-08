<template>
  <div>
    <div class="d-flex">
      <b-form-input v-model="values.id" class="flex-grow-1 mr-2" placeholder="Copy playlist's code here" />
      <b-button variant="primary" class="text-nowrap" :disabled="isWorking" @click="handleJoinPlaylist">Join playlist</b-button>
    </div>
    <div v-if="isError"><small class="text-danger">{{ isError.message }}</small></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      values: {
        id: '',
      },
      isWorking: false,
      isError: null,
    }
  },
  async mounted () {
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
    ...mapState("Playlists", {
      playlistsList: 'rows',
    }),
  },
  methods: {
    ...mapMutations("Playlists", {
      pushToRows: 'pushToRows'
    }),
    handleJoinPlaylist() {
      this.isWorking = true
      this.hasError = null
      if (this.playlistsList.find( g => g.id === this.values.id)) {
        this.isWorking = false
        this.isError = { message: 'Already joined' }
        return
      }
      var playlistRef = window.db.collection("playlists").doc(this.values.id)
      playlistRef.get().then((doc) => {
          if (doc.exists) {
            const
              payload = doc.data(),
              uid = this.userId
            payload.users.push(uid)
            playlistRef.update(payload)
              .then(() => {
                this.values.id = ''
                this.isWorking = false
              })
              .catch((error) => {
                this.isError = { message: 'Error', error }
                this.isWorking = false
              });
          } else {
            this.isError = { message: 'Can not find playlist' }
            this.isWorking = false
          }
      }).catch((error) => {
        window.console.log("Error getting document:", error);
        this.isWorking = false
      })
    },
  },
};
</script>
