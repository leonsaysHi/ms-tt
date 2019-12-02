<template>
  <b-modal
    v-model="showModal"
    title="Select playlist to share to:"
    ok-title="Share"
    @ok="handleShare"
    ok-only
  >
    <b-form-checkbox-group
      v-model="shareToPlaylists"
      :options="playlistsOptions"
      :disabled="isWorking"
      stacked
    ></b-form-checkbox-group>
  </b-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AddTune from '@/mixins/addTune';
export default {
  mixins: [AddTune],
  props: ['value'],
  data() {
    return  {
      isWorking: false,
      shareToPlaylists: null,
    }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapGetters("Playlists", {
      otherPlaylists: 'otherPlaylists',
    }),
    showModal: {
      get: function() { return this.value ? true : false },
      set: function() { }
    },
    playlistsOptions() {
      return this.otherPlaylists.map(opt =>({ text: opt.title, value: opt.id }))
    },
  },
  methods: {
    handleShare() {
      this.isWorking = true
      _.forEach(this.shareToPlaylists, this.shareTune)
      this.isWorking = false
      this.shareToPlaylists = null
      this.$emit('input', null)
    },
    async shareTune(playlistId) {
      const
        playlist = this.otherPlaylists.find(p => p.id === playlistId),
        tune = {
          ...this.value,
          uid: this.user.uid,
          date: new Date().getTime(),
        }
      await this.addTune( playlist.id, tune)
      this.$bvToast.toast('"' + tune.title + '" saved to '+ playlist.title, {
        title: 'Shared',
        variant: 'success',
        solid: true,
        appendToast: true,
      })
    },
  },
};
</script>
