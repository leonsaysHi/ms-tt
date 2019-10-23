<template>
  <div>
      <b-form-input
        v-model="email"
        label="E-mail"
        required
      ></b-form-input>

      <b-form-input
        v-model="password"
        label="Password"
        required
        :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
      ></b-form-input>

      <b-form-input
        v-model="confirmPassword"
        label="confirm Password"
        required
        :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
        :type="confirmPasswordShow ? 'text' : 'password'"
        @click:append="confirmPasswordShow = !confirmPasswordShow"
      ></b-form-input>

      <b-button
        @click="registerWithFirebase"
      >
        Register
      </b-button>
  </div>
</template>

<script>
export default {

  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    email: '',
    password: '',
    confirmPassword: '',
  }),

  methods: {
    registerWithFirebase () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUpAction', user)
    }
  }
}
</script>
