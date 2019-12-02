<template>
  <div class="flex-grow-1 d-flex flex-column align-items-stretch">
    <Controls />
    <NowPlaying />
    <div class="player">
      <youtube
        ref="youtube"
        :player-vars="playerVars"
      ></youtube>
    </div>
  </div>
</template>

<script>
import Controls from "./Controls";
import NowPlaying from "./NowPlaying";
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  components: {
    Controls,
    NowPlaying,
  },
  data() {
    return {
      playerVars: {
        controls: 0,
        modestbranding: 1,
      },
    }
  },
  async mounted () {
    this.player.addEventListener('onStateChange', this.playerChange);
    this.player.addEventListener('onError', this.playerError);
    // this.playerPlay()
  },
  computed: {
    ...mapState("Library", [
      'control',
    ]),
    ...mapGetters("Library", {
      currentTune: 'current',
    }),
    isPlaying() {
      return this.control.isPlaying || false
    },
    player () {
      return this.$refs.youtube.player
    }
  },
  watch: {
    currentTune: function(newVal, oldVal) {
      if (newVal && (!oldVal || newVal.video_id !== oldVal.video_id) ) {
        this.playerPlay()
      }
    },
    isPlaying: function(newVal, oldVal) {
      if (newVal === oldVal) { return }
      else if (newVal) {
        this.playerPlay()
      } else {
        this.playerStop()
      }
    },

  },
  methods: {
    ...mapActions("Library", {
      tuneEnded: 'handleEnded',
      stop: 'stop',
    }),
    ended() {
      window.console.log('ended')
      if (this.control.repeatOne) {
        this.player.seekTo(0)
      }
      else {
        this.tuneEnded()
      }
    },
    playerPlay () {
      if (this.currentTune && this.isPlaying) { this.player.loadVideoById(this.currentTune.video_id) }
    },
    playerStop () {
      this.player.pauseVideo()
    },
    playerError (error) {
      window.console.log('Error', error)
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
      if (state.data === 0) {
        this.ended()
      }
      if (state.data === 1) {
        // this.updateVideoCurrentTime()
      }
    },
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
  .player {
    position:relative;
    width: 100%;
    padding-top: 50%;
    ::v-deep iframe {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
