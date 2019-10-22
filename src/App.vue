<template>
  <div id="app" class="d-flex align-items-stretch">
    <div class="flex-grow-1 p-2 border-right"><Library /></div>
    <div class="p-2 w-25"><Queue /></div>
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
  #app {
    min-height: 100vh;
    > * {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
