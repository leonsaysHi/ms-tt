<template>
  <div>
    <Controls />
    <NowPlaying />
    <div class="player">
      <div class="toggler" @click="togglePlay"></div>
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
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
      togglePlay: 'togglePlay',
      tuneEnded: 'handleEnded',
    }),
    ...mapMutations("Library", {
      stop: 'stop',
      play: 'play',
    }),
    ended() {
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
      console.log('state', state)
      if (state.data === 0) {
        this.ended()
      }
      if (state.data === 1) {
        // this.updateVideoCurrentTime()
        this.play()
      }
      if (state.data === 2) {
        // this.updateVideoCurrentTime()
        this.stop()
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
