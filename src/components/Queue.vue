<template>
  <div class="p-2">
    <Controls />
    <div
      v-for="(item, idx) in players"
      :key="item.id"
      class="py-2 border-bottom"
    >
      <PlayerItem
        :item="item"
        :current="idx === 0"
        :ref="item.id"
      />
    </div>
  </div>
</template>

<script>
import Controls from "./Controls";
import PlayerItem from "./PlayerItem";
import { mapState } from 'vuex';
export default {
  name: "Queue",
  components: {
    Controls,
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
      return this.queue.map(item => ({
        ...item
      }))
    }
  },
  methods: {
  },
};
</script>
