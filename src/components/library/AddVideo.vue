<template>
  <div>
    <b-form-group
      label="Add video"
      label-for="input-add"
      :state="state"
    >
      <b-form-input
        id="input-add"
        v-model="urlInput"
        :state="state"
        :disabled="!player"
        trim
      ></b-form-input>
    </b-form-group>
    <div class="d-flex details">
      <div class="player mr-2 border-right bg-dark">
        <div :class="{'invisible': !videoId || videoId.length === 0}"><youtube
          ref="youtube"
          :player-vars="playerVars"
        ></youtube></div>
      </div>
      <div class="ml-2 flex-grow-1" v-if="videoDatas && videoDatas.title">
        <b-form-group
          label="Title"
          label-for="input-title"
        >
          <b-form-input id="input-title" v-model="videoDatas.title" :disabled="videoFromLibrary" :state="videoDatas.title.length > 0" trim></b-form-input>
        </b-form-group>
        <b-button v-if="videoFromLibrary" :disabled="true">Already added by ...</b-button>
        <b-button v-else variant="primary" @click="add">Add</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  name: "AddVideo",
  data() {
    return  {
      urlInput: '',
      videoDatas: null,
      videoFromLibrary: null,
      state: null,
      player: null,
      playerVars: {
        autoplay: 0,
        width: 200,
        height: 150,
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
    ...mapGetters("Profile", {
      userId: 'uid',
    }),
    ...mapState("Groups", {
      groupId: 'currentId',
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
    }
  },
  watch: {
    videoId: function(value) {
      if (value && value.length > 0) {
        this.videoFromLibrary = this.library.find(row => row.video_id === value) || null
        this.state = true
        this.videoDatas = this.videoFromLibrary
        this.player.loadVideoById(value)
      }
    }
  },
  methods: {
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
        payload = {
          video_id,
          title,
          uid: this.userId,
          date: new Date().getTime(),
        }
      this.pushToLibrary({ ...payload, isWorking: true })
      var tunesRef = window.db.collection("groups").doc(this.groupId).collection('tunes')
      tunesRef.doc(video_id).set(payload)
        .then(() => {
          this.saveSuccess(video_id)
        })
        .catch(() => {
          this.saveError(video_id)
        })
      this.urlInput = ''
      this.player.stopVideo()
    },
  },
};
</script>

<style lang="scss" scoped>
  .player {
    width: 200px;
    height: 150px;
    ::v-deep iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
