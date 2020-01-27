<template>
  <div class="flex-grow-1 d-flex justify-content-between">
    <h2 class="mb-0">{{ playlistTitle }}</h2>
    <div v-if="currentPlaylist" class="d-flex align-items-start">
      <PlaylistUsers class="ml-2" />
      <AddVideo v-if="isLogged" class="ml-2" />
    </div>
    <div v-else-if="isLogged" class="d-flex align-items-baseline">
      <div v-if="isError" class="mr-3"><small class="text-danger">{{ isError.message }}</small></div>
      <b-button variant="primary" @click="handleJoin" :disabled="isWorking">Join</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PlaylistUsers from './PlaylistUsers';
import AddVideo from './AddVideo';
import JoinPlaylist from '@/mixins/joinPlaylist';
export default {
  mixins: [JoinPlaylist],
  components: { PlaylistUsers, AddVideo },
  data() {
    return  {
      tmpPlaylist: null,
      isError: null,
      isWorking: false,
    }
  },
  created() {
    if (this.currentPlaylistId && !this.currentPlaylist) {
      const
        plRef = window.db.collection("playlists").doc(this.currentPlaylistId)
      plRef.get().then((doc) => {
        if (doc.exists) {
          this.tmpPlaylist = doc.data()
        }
      })
    }
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
      isLogged: 'isLogged',
    }),
    ...mapState("Playlists", {
      currentPlaylistId: 'currentId',
    }),
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
    playlistTitle() {
      return this.currentPlaylist ? this.currentPlaylist.title : this.tmpPlaylist ? this.tmpPlaylist.title : 'n/a'
    },
  },
  methods: {
    handleJoin() {
      this.isError = null
      this.isWorking = true
      this.joinPlaylist(this.userId, this.currentPlaylistId)
        .then( () => {

        })
        .catch( error => {
          this.isError = { message: error.message, error }
        })
        .finally( () => {
          this.isWorking = false
        })
    },
  },
};
</script>
