<template>
  <div class="flex-grow-1 mx-3 mx-md-5 my-3">
    <b-form-group
      label="E-mail"
      label-for="input-email"
    >
      <b-form-input
        v-model="email"
        id="input-email"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Password"
      label-for="input-password"
    >
      <b-form-input
        v-model="password"
        id="input-password"
        required
        :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
      ></b-form-input>
    </b-form-group>

    <div class="d-flex align-items-center justify-content-between">
      <b-button variant="primary" @click="loginWithFirebase">Login</b-button>
      <b-link @click="$router.replace('sign-up')">or Sign-up</b-link>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';
export default {

  data: () => ({
    passwordShow: false,
    valid: true,
    email: '',
    password: '',
  }),
  methods: {
    ...mapMutations("User", {
      initUser: 'setUser',
    }),
    loginWithFirebase () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            //const { displayName, email, uid } = resp.user
            //this.initUser({ displayName, email, uid })
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
        .catch( err => {
          window.console.log(err)
        })
    }
  }
}
</script>
