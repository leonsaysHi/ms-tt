<template>
  <b-modal
    v-model="showModal"
    hide-footer
    title="Please choose your username:"
  >
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
    <b-button variant="primary" :disabled="isWorking" @click="saveAll">Save</b-button>
    <b-spinner v-if="isWorking" small variant="primary" class="ml-2"></b-spinner>
  </b-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import UserDoc from '@/mixins/userDoc';
export default {
  mixins: [UserDoc],
  data() {
    return {
      displayName: null,
      isWorking: false,
    }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapGetters("User", {
      isLogged: 'isLogged',
    }),
    showModal() {
      return this.isLogged && this.user.isFullyLoaded && !this.user.displayName
    }
  },
  methods: {
    updateDisplayName () {
      return this.saveUserDoc(this.user.uid, {
        displayName: this.displayName
      })
    },
    async saveAll () {
      this.isWorking = true
      await this.updateDisplayName()
      this.isWorking = false
    }
  }
};
</script>

<style lang="scss" scoped>
  .title {
    line-height: 1rem;
  }
</style>
