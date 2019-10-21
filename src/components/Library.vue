<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(item, idx) in items" :key="idx"><a @click="pushToQueue(item)">
        <strong>{{ item.title }}</strong>
      </a></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "Library",
  data() {
    return  {
    }
  },
  computed: {
    ...mapState({
      queue: state => state.queue,
      library: state => state.library,
    }),
    items() {
      return _.difference(this.library, this.queue)
    },
  },
  methods: {
    ...mapMutations([
      'pushToQueue',
    ]),
  },
};
</script>
