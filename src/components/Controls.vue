<template>
  <div>
    <div class="btn-group mb-2" role="group">
      <b-button v-if="!isPlaying || isPaused" :variant="disablePlay ? '' : 'primary'" @click="handlePlay" :disabled="disablePlay"><play-icon /></b-button>
      <b-button v-else variant="primary" @click="handlePause" :disabled="disableControls"><pause-icon /></b-button>
      <b-button @click="handleSkip" :disabled="disableControls || !canSkip"><skip-next-icon /></b-button>
      <b-button :variant="repeatMode ? 'primary' : ''" @click="toggleRepeat">
        <repeat-icon v-if="repeatMode === 'all'" />
        <repeat-once-icon v-else-if="repeatMode === 'one'" />
        <repeat-off-icon v-else />
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return { }
  },
  computed: {
    ...mapState("Player", {
      isReady: 'isReady',
      currentTune: 'current',
      isPlaying: 'isPlaying',
      isPaused: 'isPaused',
    }),
    ...mapState("Library", {
      repeatAll: 'repeatAll',
      repeatOne: 'repeatOne',
    }),
    ...mapGetters("Library", {
      queue: 'queue',
      getNextInQueue: 'next',
    }),
    disableControls() {
      return !this.isReady || !this.currentTune
    },
    disablePlay() {
      return !this.isReady || !this.nextTune
    },
    nextTune() {
      return this.getNextInQueue(this.currentTune)
    },
    canSkip() {
      return this.nextTune
    },
    repeatMode() {
      return this.repeatAll ? 'all' : this.repeatOne ? 'one' : null
    },
  },
  methods: {
    ...mapMutations("Library", {
      toggleRepeat: 'toggleRepeat',
    }),
    ...mapMutations("Player", {
      play: 'play',
      pause: 'pause',
      stop: 'stop',
    }),
    handlePlay() {
      this.play(!this.isPaused ? this.nextTune : null)
    },
    handlePause() {
      this.pause()
    },
    handleSkip(){
      if (this.nextTune) {
        this.play(this.nextTune)
      }
      else {
        this.stop()
      }
    },
  },
};
</script>
