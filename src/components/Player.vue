<template>
  <div class="pl-lg-3 pb-3 pb-lg-0">
    <Controls />
    <NowPlaying />
    <div class="player" :key="playerReloaded">
      <youtube
        ref="youtube"
        :player-vars="playerVars"
        @ready="playerReady"
        @error="playerError"

      ></youtube>
    </div>
  </div>
</template>

<script>
import Controls from "./Controls";
import NowPlaying from "./NowPlaying";
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    Controls,
    NowPlaying,
  },
  data() {
    return {
      player: null,
      playerReloaded: 0,
      playerVars: {
        controls: 0,
        modestbranding: 1,
      },
    }
  },
  computed: {
    ...mapState("Player", {
      isReady: 'isReady',
      isPaused: 'isPaused',
      current: 'current',
      isPlaying: 'isPlaying',
    }),
    ...mapGetters("Library", {
      getNextInQueue: 'next',
    }),
  },
  watch: {
    current: function(newVal, oldVal) {
      if (newVal && (!oldVal || newVal.video_id !== oldVal.video_id) ) {
        this.playerPlay()
      }
    },
    isPaused: function(isPaused) {
      if (this.isPlaying && this.isPaused && isPaused) {
        this.playerPause()
      }
      else if (this.isPlaying && !this.isPaused && !isPaused) {
        this.playerUnpause()
      }
    }
  },
  methods: {
    ...mapMutations("Library", {
      tuneError: 'playbackError',
    }),
    ...mapMutations("Player", {
      setPlayerReady: 'setReady',
      setPlayerError: 'setError',
      stop: 'stop',
      play: 'play',
      pause: 'pause',
    }),
    playerReady() {
      this.player = this.$refs.youtube.player
      this.player.addEventListener('onStateChange', this.playerChange)
      this.setPlayerReady()
      if (this.isPlaying && this.current) {
        this.playerPlay()
      }
    },
    videoCued() {
      if (this.isPlaying) {
        this.player.loadVideoById(this.current.video_id)
      }
    },
    videoEnded() {
      if (this.control.repeatOne) {
        this.player.seekTo(0)
      }
      else {
        this.tuneEnded()
      }
    },
    playerPlay () {
      if (this.isReady) {
        this.currentVideoId = this.current.video_id
        this.player.cueVideoById(this.current.video_id)
      }
    },
    playerUnpause() {
      this.player.playVideo()
    },
    playerPause() {
      this.player.pauseVideo()
    },
    playerError (err) {
      console.log(err)
      this.tuneError(this.current)
      this.playerReloaded++
      this.play(this.getNextInQueue(this.current))
    },
    playerChange (state) {
      /**
       * Youtube States:
       *  -1 - unstarted
       *  0 - ended
       *  1 - playing
       *  2 - paused
       *  3 - buffering
       *  5 - video cued
       */
      console.log('state', state)
      if (state.data === 0) {
        this.videoEnded()
      }
      if (state.data === 1) {
        // this.play()
      }
      if (state.data === 5) {
        this.videoCued()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .player {
    position:relative;
    width: 100%;
    padding-top: 50%;
    .toggler {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    ::v-deep iframe {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
