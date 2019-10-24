<template>
  <div class="d-flex">
    <b-button @click="showAddModal = true">Add</b-button>
    <b-modal
      size="lg"
      v-model="showAddModal"
      id="modal-add-row"
      hide-footer
    ><AddVideo /></b-modal>
    <b-button class="ml-auto" variant="outline-primary" @click="handleLogout">logout</b-button>
  </div>
</template>

<script>
import AddVideo from './AddVideo';
import { mapState, mapActions } from 'vuex';
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
  methods: {
    ...mapActions("User", {
      logout: 'logout',
    }),
    handleLogout() {
      this.logout()
    }
  },
};
</script>
