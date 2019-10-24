<template>
  <div>
    <b-button @click="showAddModal = true">Add</b-button>
    <b-modal
      size="lg"
      v-model="showAddModal"
      id="modal-add-row"
      hide-footer
    ><AddVideo /></b-modal>

    <ul class="list-group mt-2">
      <li class="list-group-item" v-for="row in library" :key="row.video_uid">
        <Item @add-to-queue="pushToQueue(row)" :item="row" />
      </li>
    </ul>
  </div>
</template>

<script>
import AddVideo from '../AddVideo';
import Item from './LibraryItem';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "Library",
  components: {
    AddVideo,
    Item,
  },
  data() {
    return  {
      showAddModal: false
    }
  },
  created() {
    this.getLibrary()
  },
  computed: {
    ...mapState("Library", {
      queue: state => state.queue,
      library: state => state.rows,
    }),
    ...mapState("User", {
      user: state => state.user,
    }),
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
