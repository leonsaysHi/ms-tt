<template>
  <div id="app" class="d-flex align-items-stretch">
    <Library class="flex-grow-1 p-3 border-right" />
    <Queue class="py-3 w-25" />
  </div>
</template>

<script>
import Queue from "./components/Queue";
import Library from "./components/Library";

export default {
  name: "App",
  components: {
    Library,
    Queue,
  },
};
</script>

<style lang="scss">
  @import "./bootstrap.scss";
</style>
