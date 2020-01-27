<template>
  <div class="flex-grow-1 d-flex align-items-stretch" :class="{'flex-wrap': !currentPlaylistId}">
    <div class="playlist-wrapper">
      <div class="playlist-header pb-2" v-if="currentPlaylistId"><PlaylistHeader :key="currentPlaylistId" /></div>
      <div class="playlist-body">
        <div class="playlist-body-inner"><Library :key="currentPlaylistId" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import PlaylistHeader from '@/components/library/PlaylistHeader';
import Library from "@/components/Library";
export default {
  components: {
    PlaylistHeader,
    Library,
  },
  data() {
    return {
      currentTunesListener: null,
    }
  },
  created() {
    const currentPlaylistId = _.get(this.$route.params, 'id')
    this.setcurrentPlaylistId(currentPlaylistId)
    this.resetLibrary()
    this.connectToDb(currentPlaylistId)
  },
  beforeDestroy() {
    if (!_.get(this.$route.params, 'id')) this.setcurrentPlaylistId()
  },
  computed: {
    ...mapState("Playlists", {
      currentPlaylistId: 'currentId',
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
    ...mapActions("Player", {
      updatePlayingTune: 'refreshCurrent',
    }),
    connectToDb(id) {
      if (this.currentTunesListener) {
        this.currentTunesListener()
      }
      const
        updateStoreRows = this.setLibraryRows,
        updatePlayingTune = this.updatePlayingTune
      this.gettingLibraryRows()
      this.currentTunesListener = window.db.collection("playlists").doc(id).collection("tunes").orderBy("date")
        .onSnapshot(function(querySnapshot) {
          var tunes = [];
          querySnapshot.forEach(function(doc) {
            const tune = doc.data()
            tunes.push(tune)
          })
          tunes.reverse()
          updateStoreRows(tunes)
          updatePlayingTune()
        })
    },
  },
};
</script>
