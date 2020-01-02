<template>
  <div class="mb-2 d-flex align-items-end">
    <div class="btn-group" role="group">
      <b-button v-if="!isPlaying || isPaused" :variant="disablePlay ? '' : 'primary'" @click="handlePlay" :disabled="disablePlay"><play-icon /></b-button>
      <b-button v-else variant="primary" @click="handlePause" :disabled="disableControls"><pause-icon /></b-button>
      <b-button @click="handleSkip" :disabled="disableControls || !canSkip"><skip-next-icon /></b-button>
    </div>
    <div class="btn-group ml-auto" role="group">
      <b-button :variant="repeatMode ? 'primary' : ''" @click="toggleRepeat">
        <repeat-icon v-if="repeatMode === 'all'" />
        <repeat-once-icon v-else-if="repeatMode === 'one'" />
        <repeat-off-icon v-else />
      </b-button>
      <b-button :variant="isShuffled ? 'primary' : ''" @click="toggleShuffle"><shuffle-icon  /></b-button>
    </div>
    <PlaylistFilter class="ml-2" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import PlaylistFilter from '@/components/library/PlaylistFilter.vue';
export default {
  components: {
    PlaylistFilter
  },
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
      isShuffled: 'isShuffled',
    }),
    disableControls() {
      return !this.isReady || !this.currentTune
    },
    disablePlay() {
      return !this.isReady
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
      toggleShuffle: 'toggleShuffle',
    }),
    ...mapMutations("Player", {
      play: 'play',
      pause: 'pause',
      stop: 'stop',
    }),
    handlePlay() {
      if (this.isPaused) {
        this.play()
        return
      }
      const nextTune = this.nextTune || this.queue[0]
      this.play(nextTune)
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
