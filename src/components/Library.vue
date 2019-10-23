<template>
  <div>
    <AddVideo class="mb-3" />
    <ul class="list-group">
      <li class="list-group-item" v-for="(item, idx) in items" :key="idx"><a @click="pushToQueue(item)">
        <strong>{{ item.title }}</strong>
      </a></li>
    </ul>
  </div>
</template>

<script>
import AddVideo from './AddVideo';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "Library",
  components: {
    AddVideo,
  },
  data() {
    return  {
    }
  },
  created() {
    this.getLibrary()
  },
  computed: {
    ...mapState({
      user: state => state.user,
      queue: state => state.queue,
      library: state => state.library,
    }),
    items() {
      return _.difference(this.library, this.queue)
    },
  },
  methods: {
    ...mapActions([
      'getLibrary',
    ]),
    ...mapMutations([
      'pushToQueue',
    ]),
  },
};
</script>
