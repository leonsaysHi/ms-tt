<template>
  <div>
    <div class="d-flex">
      <b-form-input v-model="groupTitle" class="flex-grow-1 mr-2" placeholder="Group name" />
      <b-button variant="primary" :disabled="isWorking" @click="handleCreateGroup">Create</b-button>
    </div>
    <div v-if="isError"><small class="text-danger">{{ isError.message }}</small></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      groupTitle: '',
      isWorking: false,
      isError: null,
    }
  },
  async mounted () {
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
  },
  methods: {
    ...mapMutations("Groups", {
      pushToRows: 'pushToRows'
    }),
    handleCreateGroup() {
      this.isWorking = true
      this.isError = null
      const payload = {
        title: this.groupTitle,
        users: [this.userId],
      }
      window.db.collection("groups").add(payload)
      .then(() => {
        this.groupTitle = ''
        this.isWorking = false
      })
      .catch((error) => {
        this.isError = { message: 'Error', error }
      });
    },
  },
};
</script>
