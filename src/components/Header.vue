<template>
  <b-navbar toggleable="lg" type="light" variant="light">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Group">
          <b-dropdown-item v-for="group in groups" :key="group.group_id" @click="selectGroup(group.group_id)">{{ group.title }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right text="User">
          <b-dropdown-item @click="$router.push({name:'Profile'})">Profile</b-dropdown-item>
          <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Groups", {
      groups: 'rows',
    }),
  },
  methods: {
    ...mapMutations("User", {
      deleteUser: 'deleteUser',
    }),
    selectGroup(group_id) {
      this.$router.push({ name:'Home', params: { group_id }})
    },
    handleLogout() {
      firebase.auth().signOut().then(() => {
        this.deleteUser()
      })
    }
  },
};
</script>
