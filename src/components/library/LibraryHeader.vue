<template>
  <div class="d-flex justify-content-between">
    <h2>{{ currentGroup.title }}</h2>
    <b-button @click="showAddModal = true">Add tune</b-button>
    <b-modal
      size="lg"
      v-model="showAddModal"
      id="modal-add-row"
      hide-footer
    ><AddVideo /></b-modal>
  </div>
</template>

<script>
import AddVideo from './AddVideo';
import { mapGetters } from 'vuex';
export default {
  name: "LibraryHeader",
  components: {
    AddVideo,
  },
  data() {
    return  {
      showAddModal: false
    }
  },
  created() {
  },
  computed: {
    ...mapGetters("Groups", {
      currentGroup: 'currentGroup',
    }),
  },
};
</script>
