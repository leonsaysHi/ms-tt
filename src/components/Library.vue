<template>
  <div class="flex-grow-1 d-flex flex-column align-items-stretch">
    <LibraryHeader @add="toggleAddModal" />
    <div class="flex-grow-1 mt-2 position-relative"><div class="overflow-auto">
      <b-spinner small variant="primary" v-if="queueIsWorking"></b-spinner>
      <ul class="list-group" v-else>
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
import { mapState, mapGetters, mapActions } from 'vuex';
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
  computed: {
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
    ...mapState("Library", {
      queueIsWorking: 'isWorking',
    }),
    ...mapGetters("Library", {
      queue: 'queue',
      isPlaying: 'isPlaying',
    }),
  },
  methods: {
    ...mapActions("Library", {
      togglePlay: 'togglePlay',
      playTune: 'skipTo',
    }),
    toggleAddModal() {
      this.showAddModal = !this.showAddModal
    },
    handlePlayTune(tune) {
      this.playTune(tune)
      if (!this.isPlaying) { this.togglePlay() }
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
