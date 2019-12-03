<template>
  <div class="d-flex justify-content-between">
    <h2>{{ currentPlaylist.title }}</h2>
    <div class="d-flex align-items-start">
      <PlaylistUsers class="ml-2"></PlaylistUsers>
      <AddVideo class="ml-2"></AddVideo>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlaylistUsers from './PlaylistUsers';
import AddVideo from './AddVideo';
export default {
  components: { PlaylistUsers, AddVideo },
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
