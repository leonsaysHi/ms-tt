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
import { mapGetters, mapMutations } from 'vuex';
import Header from './components/Header';
export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      isWorking: true,
      currentPlaylistsListener: null,
      currentUserListener: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.setUser(user)
        const
          updatePlaylistsStore = this.setPlaylists,
          updateUserStore = this.setUser
        this.currentPlaylistsListener = window.db.collection("playlists").where("users", "array-contains", this.userId)
          .onSnapshot(function(querySnapshot) {
            const playlists = []
            querySnapshot.forEach(function(doc) {
              playlists.push({ id: doc.id, ...doc.data()})
            });
            updatePlaylistsStore(playlists)
          });
        this.currentUserListener = window.db.collection("users").doc(this.userId)
          .onSnapshot(function(doc) {
            updateUserStore({ ...doc.data() });
          })
        this.$router.push({ name:'Home' })
      }
      else {
        if (this.currentPlaylistsListener) {
          this.$data['currentPlaylistsListener']()
          this.$data['currentUserListener']()
        }
      }
    })
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
  },
  methods: {
    ...mapMutations("User", {
      setUser: 'setUser',
    }),
    ...mapMutations("Playlists", {
      setPlaylists: 'setPlaylists',
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
