<template>
  <div id="app" class="d-flex align-items-stretch">
    <Playlist class="w-50 p-3 border-right" />
    <Players class="py-3" />
  </div>
</template>

<script>
import Players from "./components/Players";
import Playlist from "./components/Playlist";

export default {
  name: "App",
  components: {
    Playlist,
    Players,
  },
};
</script>

<style lang="scss">
@import "./bootstrap.scss";
</style>