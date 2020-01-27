<template>
  <div>
    <div class="d-md-flex">
      <b-form-input v-model="values.id" class="flex-grow-1 mr-2" placeholder="Copy playlist's code here" />
      <b-button variant="primary" class="my-2 my-md-0 text-nowrap" :disabled="isWorking" @click="handleJoinPlaylist">Join playlist</b-button>
    </div>
    <div v-if="isError"><small class="text-danger">{{ isError.message }}</small></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import JoinPlaylist from '@/mixins/joinPlaylist';
export default {
  mixins: [JoinPlaylist],
  data() {
    return {
      values: {
        id: '',
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
    ...mapState("Playlists", {
      playlistsList: 'rows',
    }),
  },
  methods: {
    ...mapMutations("Playlists", {
      pushToRows: 'pushToRows'
    }),
    async handleJoinPlaylist() {
      if (this.playlistsList.find( g => g.id === this.values.id)) {
        this.isError = { message: 'Already joined' }
        return
      }
      this.isWorking = true
      this.hasError = null
      this.joinPlaylist(this.userId, this.values.id)
        .then(() => {
          this.resetValues()
        })
        .catch((error) => {
          this.isError = { message: error.message, error }
        })
        .finally(() => {
          this.isWorking = false
        })
    },
    resetValues() {
      this.values.id = ''
    },
  },
};
</script>
