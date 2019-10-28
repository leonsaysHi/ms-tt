<template>
  <div id="app">
    <Header />
  <b-container fluid class="py-3"><router-view></router-view></b-container>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  name: "App",
  components: {
    Header
  },
};
</script>

<style lang="scss">
  @import "./bootstrap.scss";
  #app {
    min-height: 100vh;
    > div {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
