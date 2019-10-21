<template>
  <div class="p-2">
    <div
      v-for="item in players"
      :key="item.id"
      class="my-3 pb-2 border-bottom"
    >
      <PlayerItem
        :item="item"
        @ended="ended(item)"
        :ref="item.id"
      />
    </div>
  </div>
</template>

<script>
import PlayerItem from "./PlayerItem";
import { mapState, mapMutations } from 'vuex';
export default {
  name: "Players",
  components: {
    PlayerItem,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'queue'
    ]),
    players() {
      return this.queue.slice(0,2).map(item => ({
        ...item
      }))
    }
  },
  methods: {
    ...mapMutations([
      'removeFromQueue',
    ]),
    ended(item) {
      this.removeFromQueue(item)
    },
  },
};
</script>
