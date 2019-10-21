<template>
  <div class="p-2 d-flex">
    <button :disabled="!canPlay" @click="play">Play</button>
    <button :disabled="!canSkip" @click="skip">Next</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: "Controls",
  data() {
    return { }
  },
  computed: {
    ...mapState([
      'control',
      'queue',
    ]),
    canPlay() {
      return this.queue.length > 0 && _.isNull(this.control.currentItem)
    },
    canSkip() {
      return this.queue.length > 1
    },
  },
  methods: {
    ...mapMutations([
      'removeFromQueue',
      'playQueue',
    ]),
    play() {
      this.playQueue()
    },
    skip() {
      this.removeFromQueue(this.queue[0])
    },
  },
};
</script>
