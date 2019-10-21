<template>
  <div>
    <div class="d-flex justify-content-between">
      <div><span v-if="youtubeState === 1" class="text-muted">Playing:</span> {{ item.title }} </div>
      <div><a @click="remove">&times;</a></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "PlayerItem",
  props: ['item'],
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'control'
    ]),
    isHeadOfQueue() {
      return this.control.currentItem.id === this.item.id
    },
  },
  methods: {
    ...mapMutations([
      'removeFromQueue'
    ]),
    remove() {
      this.removeFromQueue(this.item)
    },
  },
};
</script>

<style lang="scss" scoped>
  .video {
    overflow: hidden;
    max-height: 500px;
    animation: .5s max-height;
    &.-collapsed {
      max-height: 0;
    }
  }
</style>
