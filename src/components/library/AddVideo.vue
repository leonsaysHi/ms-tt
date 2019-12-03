<template>
  <div>
    <b-modal
      size="lg"
      v-model="modalShow"
      hide-footer
    >
      <b-form-group
        label="Add new tune"
        label-for="input-add"
        :state="state"
      >
        <b-form-input
          id="input-add"
          v-model="urlInput"
          :state="state"
          :disabled="!player"
          placeholder="Youtube video's URL"
          trim
        ></b-form-input>
      </b-form-group>
      <div class="d-flex align-items-start details">
        <b-spinner  small variant="primary" v-if="videoId && !hasVideoDatas"></b-spinner>
        <div class="player mr-2 border-right bg-dark" :class="{'align-self-stretch': hasVideoDatas}">
          <div>
            <youtube
              ref="youtube"
              :player-vars="playerVars"
            />
          </div>
        </div>
        <div v-if="hasVideoDatas" class="ml-2 flex-grow-1">
          <b-form-group
            label="Title"
            label-for="input-title"
          >
            <b-form-input id="input-title" v-model="videoDatas.title" :disabled="videoFromLibrary || !hasVideoDatas" :state="videoDatas.title.length > 0" trim></b-form-input>
          </b-form-group>
          <b-button v-if="videoFromLibrary" :disabled="true">Already added by ...</b-button>
          <b-button v-else variant="primary" @click="add">Add</b-button>
        </div>
      </div>
    </b-modal>
    <slot v-bind:toggle="toggle"><b-button variant="primary" @click="toggle"><plus-thick-icon /></b-button></slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import AddTune from '@/mixins/addTune';
export default {
  mixins: [AddTune],
  data() {
    return  {
      modalShow: false,
      urlInput: '',
      videoDatas: null,
      videoFromLibrary: null,
      state: null,
      player: null,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
      },
    }
  },
  mounted () {
    this.player = this.$refs.youtube.player
    this.player.addEventListener('onStateChange', this.playerChange);
    this.player.addEventListener('onError', this.playerError);
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
    ...mapState("Library", {
      library: state => state.rows,
    }),
    videoId () {
      if (this.urlInput.trim().length === 0) { return null }
      const
        groups = this.urlInput.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/),
        video_id = (_.isArray(groups) && groups[2].length === 11) ? groups[2] : this.urlInput
      return (video_id.length == 11) ? video_id : null
    },
    hasVideoDatas() {
      return !!(this.videoDatas && _.get(this.videoDatas, 'title'))
    },
  },
  watch: {
    videoId: function(value) {
      if (value) {
        this.videoFromLibrary = this.library.find(row => row.video_id === value) || null
        this.state = true
        this.videoDatas = this.videoFromLibrary
        this.player.loadVideoById(value)
      }
      else {
        this.videoDatas = null
      }
    }
  },
  methods: {
    toggle() {
      this.modalShow = true
    },
    ...mapMutations("Library", {
      pushToLibrary: 'pushToRows',
      saveSuccess: 'rowSaved',
      saveError: 'rowErrored',
    }),
    playerError () {
      this.state = false
    },
    playerChange (state) {
      if (!this.state) { return }
      this.videoDatas = state.target.getVideoData()
    },
    add () {
      const
        { video_id, title } = this.videoDatas,
        tune = {
          video_id,
          title,
          uid: this.userId,
          date: new Date().getTime(),
        }
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
  },
};
</script>

<style lang="scss" scoped>
  .player {
    width: 200px;
    position:relative;
    ::v-deep iframe {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
