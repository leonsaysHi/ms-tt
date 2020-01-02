<template>
  <div>
    <b-spinner small variant="primary" v-if="queueIsWorking"></b-spinner>
    <ul class="list-group" v-else>
      <template v-for="tune in queue">
        <Item :key="tune.video_uid"
          @play="handlePlayTune(tune)"
          @delete="handleDeleteRow(tune)"
          @edit="handleEditRow(tune)"
          @share="handleShareRow(tune)"
          :item="tune"
        />
      </template>
    </ul>
    <ShareTune v-model="rowToShare" @done="rowToShare = null" />
    <EditTune v-model="rowToEdit" @done="rowToEdit = null" />
    <b-modal v-model="showDeleteModal"
      size="small"
      hide-header
      ok-variant="danger"
      @ok="deleteRow"
    >Do you really want to delete this tune?</b-modal>
  </div>
</template>

<script>
import Item from './library/LibraryItem';
import RemoveTuneMix from '@/mixins/removeTune';
import EditTuneMix from '@/mixins/editTune';
import ShareTune from './library/ShareTune';
import EditTune from './library/EditTune';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  name: "Library",
  components: {
    Item,
    ShareTune,
    EditTune,
  },
  mixins: [ EditTuneMix, RemoveTuneMix],
  data() {
    return  {
      rowToShare: null,
      rowToEdit: null,
      rowToDelete: null,
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
    showEditModal: {
      get: function() { return !_.isNull(this.rowToEdit) },
      set: () => {}
    },
    showDeleteModal: {
      get: function() { return !_.isNull(this.rowToDelete) },
      set: () => {}
    },
  },
  methods: {
    ...mapMutations("Player", {
      playTune: 'play',
    }),
    handlePlayTune(tune) {
      this.playTune(tune)
    },
    handleShareRow(row) {
      this.rowToShare = row
    },
    handleEditRow(row) {
      this.rowToEdit = Object.assign({}, row)
    },
    handleDeleteRow(row) {
      this.rowToDelete = row
    },
    deleteRow() {
      if (!this.rowToDelete) { return }
      this.removeTune( this.currentPlaylist.id, this.rowToDelete)
        .then(() => {
          this.$bvToast.toast('"' + this.rowToDelete.title + '" removed from playlist.', {
            title: 'Removed',
            variant: 'success',
            solid: true,
            appendToast: true,
          })
          this.rowToDelete = null
        })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
