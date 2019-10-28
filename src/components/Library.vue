<template>
  <div>
    <LibraryHeader />
    <ul class="list-group mt-2">
      <li class="list-group-item p-3" v-for="row in rows" :key="row.video_uid">
        <Item @add-to-queue="pushToQueue(row)" :item="row" />
      </li>
    </ul>
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
    if (this.$route.params.group_id) {
      this.getLibrary({ group_id: this.$route.params.group_id })
    }
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
      getLibrary: 'getRows',
    }),
    ...mapMutations("Library", [
      'pushToQueue',
    ]),
  },
};
</script>
