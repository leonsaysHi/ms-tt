<template>
  <div class="flex-grow-1 d-flex flex-column align-items-stretch">
    <LibraryHeader @add="toggleAddModal" />
    <div class="flex-grow-1 mt-2 position-relative"><div class="overflow-auto">
      <ul class="list-group">
        <template v-for="tune in queue">
          <Item :key="tune.video_uid"
            @play="handlePlayTune(tune)"
            @delete="deleteRow(tune)"
            :item="tune"
          />
        </template>
      </ul>
    </div></div>
    <b-modal
      size="lg"
      v-model="showAddModal"
      id="modal-add-row"
      hide-footer
    >
      <AddVideo @add="handleAddRow" />
    </b-modal>
  </div>
</template>

<script>
import LibraryHeader from './library/LibraryHeader';
import Item from './library/LibraryItem';
import AddVideo from './library/AddVideo';
import AddTune from '@/mixins/addTune';
import RemoveTune from '@/mixins/removeTune';
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: "Library",
  components: {
    LibraryHeader,
    Item,
    AddVideo,
  },
  mixins: [AddTune, RemoveTune],
  data() {
    return  {
      showAddModal: false,
      currentTunesListener: null,
    }
  },
  created() {
    const
      updateStore = this.setLibrary
    this.currentTunesListener = window.db.collection("playlists").doc(this.currentPlaylist.id).collection("tunes").orderBy("date")
      .onSnapshot(function(querySnapshot) {
        var tunes = [];
        querySnapshot.forEach(function(doc) {
          tunes.push(doc.data())
        })
        updateStore(tunes)
      })
  },
  beforeDestroy() {
    this.$data['currentTunesListener']()
    this.resetLibrary()
  },
  computed: {
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
    ...mapGetters("Library", {
      queue: 'queue',
    }),
  },
  methods: {
    ...mapMutations("Library", {
      resetLibrary: 'reset',
      setLibrary: 'setRows',
    }),
    ...mapActions("Library", {
      playTune: 'skipTo',
    }),
    toggleAddModal() {
      this.showAddModal = !this.showAddModal
    },
    handlePlayTune(tune) {
      this.playTune(tune)
    },
    handleAddRow(tune) {
      this.addTune( this.currentPlaylist.id, tune)
        .then(() => {
          this.$bvToast.toast('"' + tune.title + '" saved to playlist.', {
            title: 'Shared',
            variant: 'success',
            solid: true,
            appendToast: true,
          })
        })
        .finally(() => {
          this.toggleAddModal()
        })
    },
    deleteRow(tune) {
      this.removeTune( this.currentPlaylist.id, tune)
        .then(() => {
          this.$bvToast.toast('"' + tune.title + '" removed from playlist.', {
            title: 'Removed',
            variant: 'success',
            solid: true,
            appendToast: true,
          })
        })
    }
  },
};
</script>

<style lang="scss" scoped>
  .position-relative > .overflow-auto {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
