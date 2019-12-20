<template>
  <b-navbar toggleable="md" type="light" variant="light">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav-collapse">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Playlists" :disabled="!playlists || playlists.length === 0">
          <b-dropdown-item
            v-for="playlist in playlists"
            :key="playlist.id"
            @click="selectPlaylist(playlist.id)"
            :disabled="playlist.id === currentPlaylistId"
          >{{ playlist.title }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right text="User">
          <b-dropdown-item :to="{name:'profile'}">Profile</b-dropdown-item>
          <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters("User", {
      isLogged: 'isLogged',
    }),
    ...mapState("Playlists", {
      currentPlaylistId: 'currentId',
      playlists: 'rows',
    }),
    showLogin() {
      return !this.isLogged && this.$route.name === "Playlist"
    },
  },
  methods: {
    ...mapMutations("User", {
      deleteUser: 'deleteUser',
    }),
    selectPlaylist(id) {
      this.$router.push({ name:'playlist', params: { id }})
    },
    handleLogout() {
      window.firebase.auth().signOut().then(() => {
        this.deleteUser()
      })
    }
  },
};
</script>
