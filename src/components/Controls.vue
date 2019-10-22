<template>
  <div>
    <div class="btn-group btn-group-sm" role="group">
      <button class="btn btn-secondary" :disabled="!canPlay" @click="play">Play</button>
      <button class="btn btn-secondary" :disabled="!canSkip" @click="skip">Next</button>
    </div>
    <div v-if="hasCurrentItem" class="border-top my-1 pt-2"><span class="text-muted">Playing:</span> {{ control.currentItem.title }}</div>
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
    hasCurrentItem() {
      return !_.isNull(this.control.currentItem)
    },
    canPlay() {
      return this.queue.length > 0 && !this.hasCurrentItem
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
