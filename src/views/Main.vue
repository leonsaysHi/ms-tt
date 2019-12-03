<template>
  <div class="flex-grow-1 d-flex align-items-stretch p-3">
    <div class="playlist-wrapper" v-if="currentPlaylist" :key="currentPlaylist.id">
      <div class="playlist-header pb-2"><PlaylistHeader /></div>
      <div class="playlist-player"><Player /></div>
      <div class="playlist-body">
        <div class="playlist-body-inner"><Library /></div>
      </div>
    </div>
    <div class="d-flex align-items-start flex-wrap" v-else>
      <b-card v-for="playlist in playlists" :title="playlist.title" :key="playlist.id" bg-variant="light" class="m-3">
        <b-card-text>
          {{ playlist.users.length }} players.
        </b-card-text>
        <template v-slot:footer>
          <b-button @click="selectPlaylist(playlist.id)" variant="primary" class="stretched-link">Open</b-button>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import PlaylistHeader from '@/components/library/PlaylistHeader';
import Player from "@/components/Player";
import Library from "@/components/Library";
export default {
  name: "Main",
  components: {
    PlaylistHeader,
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
      if (this.currentTunesListener) {
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
