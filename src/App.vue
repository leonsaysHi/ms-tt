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
      currentGroupsListener: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.setUser(user)
        const
          updateStore = this.setGroups
        this.currentGroupsListener = window.db.collection("groups").where("users", "array-contains", this.userId)
          .onSnapshot(function(querySnapshot) {
            const groups = []
            querySnapshot.forEach(function(doc) {
              groups.push({ group_id: doc.id, ...doc.data()})
            });
            updateStore(groups)
          });
      }
      else {
        if (this.currentGroupsListener) {
          this.$data['currentGroupsListener']()
        }
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
    ...mapMutations("Groups", {
      setGroups: 'setGroups',
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
