<template>
  <div class="flex-grow-1 d-flex align-items-start flex-wrap p-3">
    <b-card v-for="playlist in playlists" :title="playlist.title" :key="playlist.id" bg-variant="light" class="m-3">
      <b-card-text>
        {{ playlist.users.length }} players.
      </b-card-text>
      <template v-slot:footer>
        <b-button @click="selectPlaylist(playlist.id)" variant="primary" class="stretched-link">Open</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState("Playlists", {
      playlists: 'rows',
    }),
  },
  methods: {
    selectPlaylist(id) {
      this.$router.push({ name:'playlist', params: { id }})
    }
  }
};
</script>
