<template>
  <div class="flex-grow-1 d-flex align-items-stretch p-3">
    <template v-if="currentPlaylist">
      <div class="playlist-wrapper" :key="currentPlaylistId">
        <div class="playlist-header pb-2"><PlaylistHeader /></div>
        <div class="playlist-player pb-2"><Player /></div>
        <div class="playlist-body">
          <div class="playlist-body-inner"><Library /></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PlaylistHeader from '@/components/library/PlaylistHeader';
import Player from "@/components/Player";
import Library from "@/components/Library";
export default {
  components: {
    PlaylistHeader,
    Library,
    Player,
  },
  data() {
    return {
      currentPlaylistId: null,
      currentTunesListener: null,
    }
  },
  created() {
    this.currentPlaylistId = _.get(this.$route.params, 'id')
    this.setcurrentPlaylistId(this.currentPlaylistId)    
    this.resetLibrary()
    this.connectToDb(this.currentPlaylistId)
  },
  beforeDestroy() {
    if (!_.get(this.$route.params, 'id')) this.setcurrentPlaylistId()
  },
  computed: {
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
  },
};
</script>
