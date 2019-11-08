<template>
  <div class="d-flex justify-content-between">
    <h2>{{ currentPlaylist.title }}</h2>
    <b-button @click="$emit('add')">New tune</b-button>    
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
