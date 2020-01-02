<template>
  <div>
    <b-spinner small variant="primary" v-if="queueIsWorking"></b-spinner>
    <ul class="list-group" v-else>
      <template v-for="tune in queue">
        <Item :key="tune.video_uid"
          @play="handlePlayTune(tune)"
          @delete="handleDeleteRow(tune)"
          @edit="handleEditRow(tune)"
          :item="tune"
        />
      </template>
    </ul>
    <b-modal v-model="showDeleteModal"
      size="small"
      hide-header
      ok-variant="danger"
      @ok="deleteRow"
    >Do you really want to delete this tune?</b-modal>
    <b-modal v-model="showEditModal"
      size="lg"
      ok-title="Save"
      @ok="saveRow"
    >
      <template v-if="rowToEdit">
        <b-form-group
          label="Title"
          label-for="input-title"
        >
          <b-form-input id="input-title" v-model="rowToEdit.title" :state="rowToEdit.title.length > 0" trim></b-form-input>
        </b-form-group>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Item from './library/LibraryItem';
import RemoveTune from '@/mixins/removeTune';
import EditTune from '@/mixins/editTune';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  name: "Library",
  components: {
    Item,
  },
  mixins: [ EditTune, RemoveTune],
  data() {
    return  {
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
    handleEditRow(tune) {
      this.rowToEdit = Object.assign({}, tune)
    },
    handleDeleteRow(tune) {
      this.rowToDelete = tune
    },
    saveRow() {
      this.editTune(this.currentPlaylist.id, this.rowToEdit)
      .then(() => {
        this.$bvToast.toast('"' + this.rowToEdit.title + '" has been edited', {
          title: 'Done',
          variant: 'success',
          solid: true,
          appendToast: true,
        })
        this.rowToEdit = null
      })
    },
    deleteRow() {
      console.log('delete', this.rowToDelete)
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
