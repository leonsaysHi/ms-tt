<template>
  <div class="flex-grow-1 d-flex align-items-stretch" :class="{'flex-wrap': !currentPlaylist}">
    <div class="playlist-wrapper">
      <div class="playlist-header pb-2" v-if="currentPlaylist"><PlaylistHeader :key="currentPlaylistId" /></div>
      <div class="playlist-body">
        <div class="playlist-body-inner"><Library :key="currentPlaylistId" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PlaylistHeader from '@/components/library/PlaylistHeader';
import Library from "@/components/Library";
export default {
  components: {
    PlaylistHeader,
    Library,
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
      gettingLibraryRows: 'gettingRows',
      setLibraryRows: 'setRows',
    }),
    connectToDb(id) {
      if (this.currentTunesListener) {
        this.currentTunesListener()
      }
      const updateStoreRows = this.setLibraryRows
      this.gettingLibraryRows()
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
