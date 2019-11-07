<template>
  <b-navbar toggleable="lg" type="light" variant="light">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Group" :disabled="!groupsList || groupsList.length === 0">
          <b-dropdown-item
            v-for="group in groupsList"
            :key="group.group_id"
            @click="selectGroup(group.group_id)"
            :disabled="group.group_id === currentGroupsId"
          >{{ group.title }}</b-dropdown-item>
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
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Groups", {
      currentGroupsId: 'currentId',
      groupsList: 'rows',
    }),
  },
  methods: {
    ...mapMutations("User", {
      deleteUser: 'deleteUser',
    }),
    selectGroup(group_id) {
      this.$router.push({ name:'GroupHome', params: { group_id }})
    },
    handleLogout() {
      window.firebase.auth().signOut().then(() => {
        this.deleteUser()
      })
    }
  },
};
</script>
