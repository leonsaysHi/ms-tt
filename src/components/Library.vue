<template>
  <div class="flex-grow-1 d-flex flex-column align-items-stretch">
    <LibraryHeader />
    <div class="flex-grow-1 mt-2 position-relative"><div class="overflow-auto">
      <ul class="list-group">
        <li class="list-group-item p-3" v-for="row in rows" :key="row.video_uid">
          <Item @add-to-queue="pushToQueue(row)" :item="row" />
        </li>
      </ul>
    </div></div>
  </div>
</template>

<script>
import LibraryHeader from './library/LibraryHeader';
import Item from './library/LibraryItem';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "Library",
  components: {
    LibraryHeader,
    Item,
  },
  data() {
    return  {
      showAddModal: false
    }
  },
  created() {
    this.initLibrary()
  },
  computed: {
    ...mapState("Groups", {
      currentGroup: state => state.current,
    }),
    ...mapState("Library", {
      queue: state => state.queue,
      library: state => state.rows,
    }),
    rows() {
      const rows = this.library.slice()
      rows.reverse()
      return rows
    }
  },
  methods: {
    ...mapActions("Library", {
      initLibrary: 'getRows',
    }),
    ...mapMutations("Library", [
      'pushToQueue',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .position-relative > .overflow-auto {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
