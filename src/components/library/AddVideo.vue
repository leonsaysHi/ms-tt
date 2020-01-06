<template>
  <div>
    <b-modal
      size="lg"
      v-model="modalShow"
      hide-footer
      @shown="onShow"
      @hide="onHide"
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
          :disabled="!playerReady"
          placeholder="Youtube video's URL"
          trim
        ></b-form-input>
      </b-form-group>
      <div class="d-lg-flex align-items-start details">
        <div class="player mr-2 mb-3 border-right bg-dark">
          <div>
            <youtube
              ref="youtube"
              :player-vars="playerVars"
              @ready="playerReady = true"
            />
          </div>
        </div>
        <template v-if="videoId">
          <b-spinner v-if="!hasVideoDatas" small variant="primary"></b-spinner>
          <div v-else class="ml-lg-2 flex-grow-1">
            <b-form-group
              label="Title"
              label-for="input-title"
            >
              <b-form-input id="input-title" v-model="videoDatas.title" :disabled="videoAlreadyAdded || !hasVideoDatas" :state="videoDatas.title.length > 0" trim></b-form-input>
            </b-form-group>
            <b-form-group
              label="Shout"
              label-for="input-message"
              :description="messageDescription"
            >
              <b-form-input
              id="input-message"
              v-model="form.values.message"
              :disabled="videoAlreadyAdded || !hasVideoDatas"
              @keyup="handleLimitMessage"
              trim></b-form-input>
            </b-form-group>
            <div class="d-flex">
              <b-button v-if="videoAlreadyAdded" :disabled="true">Already added by <display-name :uid="videoAlreadyAdded.uid" /></b-button>
              <b-button v-else variant="primary" @click="add" class="ml-auto">Add</b-button>
            </div>
          </div>
        </template>
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
      playerReady: false,
      form: {
        maxMessageLength: 50,
        values: {
          message: null,
        },
      },
      urlInput: '',
      videoDatas: null,
      videoAlreadyAdded: null,
      state: null,
      player: null,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
      },
    }
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
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
    messageDescription() {
      return (_.isString(this.form.values.message) ? this.form.values.message.length : 0) + '/' + this.form.maxMessageLength
    }
  },
  watch: {
    videoId: function(value) {
      if (value) {
        this.videoAlreadyAdded = this.library.find(row => row.video_id === value) || null
        this.state = true
        this.videoDatas = this.videoAlreadyAdded
        this.player.loadVideoById(value)
      }
      else {
        this.videoDatas = null
        this.player.stopVideo()
        this.player.clearVideo()
      }
    }
  },
  methods: {
    toggle() {
      this.modalShow = true
    },
    onShow() {
      this.player = this.$refs.youtube.player
      this.player.addEventListener('onStateChange', this.playerChange)
      this.player.addEventListener('onError', this.playerError)
    },
    onHide() {
      this.player.removeEventListener('onStateChange')
      this.player.removeEventListener('onError')
      this.playerReady = false
      this.player = null
      this.urlInput = ''
      this.form.values.message = null
      this.videoDatas = null
      this.videoAlreadyAdded = null
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
      if (state.target) {
        const vd = state.target.getVideoData()
        if (!_.get(this.videoDatas, 'video_id') && _.get(vd, 'title')) {
          this.videoDatas = vd
        }
      }
    },
    handleLimitMessage() {
      this.form.values.message = _.isString(this.form.values.message) ? this.form.values.message.substring(0, this.form.maxMessageLength) : ''
    },
    add () {
      const
        { video_id, title } = this.videoDatas,
        tune = {
          video_id,
          title,
          message: this.message,
          uid: this.userId,
          date: new Date().getTime(),
        }
      this.addTune( this.currentPlaylist.id, tune)
        .then(() => {
          this.$bvToast.toast('"' + tune.title + '" saved to playlist.', {
            title: 'Added',
            variant: 'success',
            solid: true,
            appendToast: true,
          })
        })
        .finally(() => {
          this.modalShow = false
        })
    },
  },
};
</script>

<style lang="scss" scoped>
  .player {
    width: 200px;
    height: 150px;
    position:relative;
    ::v-deep iframe {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
