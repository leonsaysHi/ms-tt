<template>
  <span>
    {{ displayName }}
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    uid: { required: true },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState("Players", {
      usersList: 'rows',
    }),
    displayName() {
      const user = _.get(this.usersList, this.uid)
      if (!user) { this.getUser(this.uid) }
      return user ? user.displayName : '...'
    }
  },
  methods: {
    ...mapActions("Players", {
      getUser: 'getRow',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .position-relative > .overflow-auto {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .player {
    position:relative;
    width: 100%;
    padding-top: 50%;
    ::v-deep iframe {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
