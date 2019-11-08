<template>
    <div class="flex-grow-1 d-flex align-items-stretch justify-content-center">
      <template v-if="currentPlaylist">
        <div class="d-flex flex-column align-items-stretch flex-grow-1 p-2 border-right"><Library :key="currentPlaylistId" /></div>
        <div class="d-flex flex-column align-items-stretch p-2 w-25"><Queue :key="currentPlaylistId" /></div>
      </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Queue from "@/components/Queue";
import Library from "@/components/Library";
export default {
  name: "Main",
  components: {
    Library,
    Queue,
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
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
  },
  methods: {
    ...mapMutations("Playlists", {
      setcurrentPlaylistId: 'setCurrent',
    }),
  },
};
</script>
