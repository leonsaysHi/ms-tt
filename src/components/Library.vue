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
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  name: "Library",
  components: {
    LibraryHeader,
    Item,
  },
  data() {
    return  {
      showAddModal: false,
      currentGroupListener: null,
    }
  },
  created() {
    const
      updateStore = this.setLibrary
    this.currentGroupListener = window.db.collection("groups").doc(this.currentGroup.group_id).collection("tunes")
      .onSnapshot(function(querySnapshot) {
        var tunes = [];
        querySnapshot.forEach(function(doc) {
          tunes.push(doc.data())
        })
        updateStore(tunes)
      })
  },
  beforeDestroy() {
    this.$data['currentGroupListener']()
    this.resetLibrary()
  },
  computed: {
    ...mapGetters("Groups", {
      currentGroup: 'currentGroup',
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
    ...mapMutations("Library", {
      resetLibrary: 'reset',
      setLibrary: 'setRows',
      pushToQueue: 'pushToQueue',
    }),
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
