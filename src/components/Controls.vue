<template>
  <div>
    <div class="btn-group btn-group-sm mb-2" role="group">
      <button class="btn btn-primary" v-if="canPlay" @click="togglePlay">Play</button>
      <button class="btn btn-secondary" v-else @click="togglePlay">Stop</button>
      <button class="btn btn-secondary" :disabled="!canSkip" @click="skip(1)">Skip</button>
      <button class="btn btn-primary" v-if="repeatMode" @click="toggleRepeat">Repeat {{ repeatMode }}</button>
      <button class="btn btn-secondary" v-else @click="toggleRepeat">Repeat off</button>
    </div>
    <div v-if="currentTune" class="border-top my-1 pt-2"><span class="text-muted">Playing:</span> {{ currentTune.title }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: "Controls",
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
    }
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
