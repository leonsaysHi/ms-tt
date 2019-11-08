<template>
  <b-card no-body class="flex-grow-1 m-2">
    <b-tabs pills card>
      <b-tab title="Profile" active>
        <b-form-group
          label="E-mail"
          label-for="input-email"
        >
          <b-form-input
            v-model="email"
            id="input-email"
            :disabled="isWorking"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Username"
          label-for="input-displayName"
        >
          <b-form-input
            v-model="displayName"
            id="input-displayName"
            :disabled="isWorking"
          ></b-form-input>
        </b-form-group>
        <hr />
        <b-button variant="primary" :disabled="isWorking" @click="saveAll">Save all</b-button>
        <b-spinner v-if="isWorking" small variant="primary" class="ml-2"></b-spinner>
      </b-tab>
      <b-tab title="Playlists"><Playlists /></b-tab>
    </b-tabs>
  </b-card>


</template>

<script>
import firebase from 'firebase';
import Playlists from '@/components/Playlists.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
   Playlists
  },
  data: () => ({
    displayName: '',
    email: '',
    isWorking: false,
  }),
  async created() {
    this.isWorking = true
    this.email = this.user.email
    this.displayName = this.user.displayName
    this.isWorking = false
  },
  computed: {
    ...mapState("User", {
      user: state => state.user,
    }),
  },
  methods: {
    ...mapMutations("User", {
      setUser: 'setUser',
    }),
    updateEmail () {
      var user = firebase.auth().currentUser;
      return user.updateEmail(this.email).then(function(resp) {
        window.console.log(resp)
      }).catch(function(error) {
        window.console.log(error)
      });
    },
    updateDisplayName () {
      var user = firebase.auth().currentUser;
      return user.updateProfile({
        displayName: this.displayName
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        window.console.log(error)
      });
    },
    async saveAll () {
      this.isWorking = true
      await this.updateEmail()
      await this.updateDisplayName()
      this.isWorking = false
    }
  }
}
</script>
