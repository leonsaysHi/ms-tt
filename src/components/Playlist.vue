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
  name: "Playlist",
  data() {
    return  {
    }
  },
  computed: {
    ...mapState({
      items: state => state.playlist,
    }),
  },
  methods: {
    ...mapMutations([
      'pushToQueue',
    ]),
  },
};
</script>
