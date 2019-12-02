<template>
  <div>
    <div class="btn-group mb-2" role="group">
      <b-button :variant="canPlay ? 'primary' : ''" @click="togglePlay">
        <play-icon v-if="canPlay" />
        <stop-icon v-else />
      </b-button>
      <b-button :disabled="!canSkip" @click="skip(1)"><skip-next-icon /></b-button>
      <b-button :variant="repeatMode ? 'primary' : ''" @click="toggleRepeat">
        <repeat-icon v-if="repeatMode === 'all'" />
        <repeat-once-icon v-else-if="repeatMode === 'one'" />
        <repeat-off-icon v-else />
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return { }
  },
  computed: {
    ...mapState("Library", [
      'control',
    ]),
    ...mapGetters("Library", {
      queue: 'queue',
      currentTune: 'current',
    }),
    canPlay() {
      return this.queue.length > 0 && !this.control.isPlaying
    },
    canSkip() {
      return this.queue.length > 1
    },
    repeatMode() {
      return this.control.repeatAll ? 'all' : this.control.repeatOne ? 'one' : null
    },
  },
  methods: {
    ...mapActions("Library", {
      togglePlay: 'togglePlay',
      skip: 'skip',
      toggleRepeat: 'toggleRepeat',
    }),
  },
};
</script>
