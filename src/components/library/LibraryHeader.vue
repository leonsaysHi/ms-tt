<template>
  <div class="d-flex">
    <b-button @click="showAddModal = true">Add</b-button>
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
import { mapState } from 'vuex';
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
    ...mapState("User", {
      user: state => state.user,
    }),
  },
};
</script>
