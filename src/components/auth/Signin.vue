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

    <b-button
      @click="loginWithFirebase"
    >
      Login
    </b-button>
  </div>
</template>

<script>
export default {

  data: () => ({
    passwordShow: false,
    valid: true,
    email: '',
    password: '',
  }),

  methods: {
    loginWithFirebase () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('User/signInAction', user)
    }
  }
}
</script>
