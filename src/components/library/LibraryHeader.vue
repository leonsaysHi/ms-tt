<template>
  <div class="d-flex justify-content-between">
    <h2>{{ currentPlaylist.title }}</h2>
    <div class="d-flex align-items-start">
      <PlaylistUsers v-slot:default="{ toggle }">
        <b-button variant="light" @click="toggle" class="ml-2"><account-group-icon /></b-button>
      </PlaylistUsers>
      <b-button variant="primary" @click="$emit('add')" class="ml-2"><plus-thick-icon /></b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlaylistUsers from './PlaylistUsers';
export default {
  components: { PlaylistUsers },
  data() {
    return  {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
  },
};
</script>
