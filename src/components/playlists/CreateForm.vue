<template>
  <div>
    <div class="d-flex">
      <b-form-input v-model="values.title" class="flex-grow-1 mr-2" placeholder="New playlist's name" />
      <b-button variant="primary" class="text-nowrap" :disabled="isWorking" @click="handleCreatePlaylist">Create new playlist</b-button>
    </div>
    <div v-if="isError"><small class="text-danger">{{ isError.message }}</small></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      values: {
        title: '',
      },
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
    ...mapMutations("Playlists", {
      pushToRows: 'pushToRows'
    }),
    handleCreatePlaylist() {
      this.isWorking = true
      this.isError = null
      const payload = {
        title: this.values.title,
        users: [this.userId],
      }
      window.db.collection("playlists").add(payload)
      .then(() => {
        this.values.title = ''
        this.isWorking = false
      })
      .catch((error) => {
        this.isError = { message: 'Error', error }
      });
    },
  },
};
</script>
