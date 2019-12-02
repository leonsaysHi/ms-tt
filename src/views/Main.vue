<template>
  <div class="flex-grow-1 d-flex align-items-stretch justify-content-center">
    <template v-if="currentPlaylist">
      <div class="d-flex flex-column align-items-stretch w-50 p-2 border-right"><Library :key="currentPlaylistId" /></div>
      <div class="d-flex flex-column align-items-stretch w-50 p-2"><Player :key="currentPlaylistId" /></div>
    </template>
    <template v-else-if="playlists">
      <div class="p-3 flex-grow-1">
          <b-card v-for="playlist in playlists" :title="playlist.title" :key="playlist.id" bg-variant="light" class="mt-3">
            <b-card-text>
              {{ playlist.users.length }} players.
            </b-card-text>
            <template v-slot:footer>
              <b-button @click="selectPlaylist(playlist.id)" variant="primary" class="stretched-link">Open</b-button>
            </template>
          </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Player from "@/components/Player";
import Library from "@/components/Library";
export default {
  name: "Main",
  components: {
    Library,
    Player,
  },
  data() {
    return {
      currentTunesListener: null
    }
  },
  beforeDestroy() {
    this.setcurrentPlaylistId()
  },
  watch: {
    currentPlaylistId: {
      handler: function(val) {
        if(val) {
          this.setcurrentPlaylistId(val)
          this.connectToDb(val)
        }
      },
      immediate: true,
    }
  },
  computed: {
    currentPlaylistId() {
      return this.$route.params.id
    },
    ...mapState("Playlists", {
      playlists: 'rows',
    }),
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
  },
  methods: {
    ...mapMutations("Playlists", {
      setcurrentPlaylistId: 'setCurrent',
    }),
    ...mapMutations("Library", {
      resetLibrary: 'reset',
      setLibraryRows: 'setRows',
    }),
    connectToDb(id) {
      console.log('connectToDB')
      if (this.currentTunesListener) {
        console.log('clear listener')
        this.currentTunesListener()
        this.resetLibrary()
      }
      const updateStoreRows = this.setLibraryRows
      this.currentTunesListener = window.db.collection("playlists").doc(id).collection("tunes").orderBy("date")
        .onSnapshot(function(querySnapshot) {
          var tunes = [];
          querySnapshot.forEach(function(doc) {
            tunes.push(doc.data())
          })
          tunes.reverse()
          updateStoreRows(tunes)
        })
    },
    selectPlaylist(id) {
      this.$router.push({ name:'PlaylistsHome', params: { id }})
    },
  },
};
</script>
