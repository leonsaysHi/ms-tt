<template>
  <div class="d-flex justify-content-between">
    <h2>{{ currentPlaylist.title }}</h2>
    <b-button variant="primary" @click="$emit('add')"><plus-thick-icon /></b-button>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "LibraryHeader",
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
