<template>
  <div class="flex-grow-1 d-flex align-items-stretch justify-content-center">
    <template v-if="currentPlaylist">
      <div class="d-flex flex-column align-items-stretch flex-grow-1 p-2 border-right"><Library :key="currentPlaylistId" /></div>
      <div class="d-flex flex-column align-items-stretch p-2 w-25"><Player :key="currentPlaylistId" /></div>
    </template>
    <template v-else-if="playlists">
      <b-card-group class="flex-grow-1 p-4" deck>
        <b-card v-for="playlist in playlists" :title="playlist.title" :key="playlist.id">
          <b-card-text>
            <b-button @click="selectPlaylist(playlist.id)" class="stretched-link">Open</b-button>
          </b-card-text>
        </b-card>
      </b-card-group>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Player from "@/components/Player";
import Library from "@/components/Library";
export default {
  name: "Main",
  components: {
    Library,
    Player,
  },
  beforeDestroy() {
    this.setcurrentPlaylistId()
  },
  watch: {
    currentPlaylistId: {
      handler: function(val) {
        this.setcurrentPlaylistId(val)
      },
      immediate: true,
    }
  },
  computed: {
    currentPlaylistId() {
      return this.$route.params.id
    },
    ...mapState("Playlists", {
      playlists: 'rows',
    }),
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
  },
  methods: {
    ...mapMutations("Playlists", {
      setcurrentPlaylistId: 'setCurrent',
    }),
    selectPlaylist(id) {
      this.$router.push({ name:'PlaylistsHome', params: { id }})
    },
  },
};
</script>
