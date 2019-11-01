<template>
  <div class="w-50 mx-auto my-3 p-2">
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


    <b-form-group
      label="Confirm password"
      label-for="input-confirmPassword"
    >
      <b-form-input
        v-model="confirmPassword"
        id="input-confirmPassword"
        required
        :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
        :type="confirmPasswordShow ? 'text' : 'password'"
        @click:append="confirmPasswordShow = !confirmPasswordShow"
      ></b-form-input>
    </b-form-group>

    <div class="d-flex align-items-center justify-content-between">
      <b-button variant="primary" @click="signUp">Register</b-button>
      <b-link @click="$router.replace('login')">or Log-in</b-link>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';
export default {

  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    email: '',
    password: '',
    confirmPassword: '',
  }),

  methods: {
    ...mapActions("User", {
      setUser: 'setUser',
    }),
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.setUser(user)
          this.$router.replace({ name: 'Home' })
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      );
    }
  }
}
</script>
