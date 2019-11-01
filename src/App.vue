<template>
  <div id="app" class="d-flex flex-column align-items-stretch">
    <Header v-if="$route.meta.requiresAuth" />
    <div class="flex-grow-1 d-flex align-items-stretch">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from './components/Header';
export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      isWorking: true,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.setUser(user)
        this.initGroups(this.userId)
      }
    })
  },
  computed: {
    ...mapGetters("Profile", {
      userId: 'uid',
    }),
  },
  methods: {
    ...mapMutations("Profile", {
      setUser: 'setUser',
    }),
    ...mapActions("Groups", {
      initGroups: 'initGroups',
    }),
  }
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
