<template>
  <div class="d-flex align-items-start">
    <b-button :variant="isInQueue ? '' : 'primary'" :disabled="isInQueue" @click="$emit('queue')" size="sm" class="mr-2">+</b-button>
    <div class="title">
      <span>{{ owner.displayName }}</span> <small class="text-secondary">{{ item.date | moment("from") }}</small>
      <br><strong :class="{'text-muted': item.isWorking, 'text-danger': item.isErrored}">{{ item.title }} </strong>
    </div>
    <div class="ml-auto">
      <b-spinner v-if="item.isWorking" small variant="primary" class="ml-2"></b-spinner>
      <b-dropdown id="dropdown-1" text="..." size="sm" class="ml-2">
        <b-dropdown-item @click="$emit('share')">Share</b-dropdown-item>
        <b-dropdown-item :disabled="!isOwner" @click="$emit('delete')"><span class="text-danger">Delete</span></b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "LibraryItem",
  props: ['item'],
  data() {
    return  {
    }
  },
  created() {
    if (!this.isOwner && !_.get(this.usersList, this.item.uid)) {
      this.getUser(this.item.uid)
    }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapState("Profiles", {
      usersList: 'rows',
    }),
    ...mapState("Library", {
      queue: state => state.queue,
    }),
    owner() {
      return this.isOwner ? this.user : _.get(this.usersList, this.item.uid, { displayName: '...' })
    },
    userId() {
      return this.user.uid
    },
    isOwner() {
      return this.item.uid === this.userId
    },
    isInQueue() {
      return !!this.queue.find(i => i.video_id === this.item.video_id)
    },
  },
  methods: {
    ...mapActions("Profiles", {
      getUser: 'getRow',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .title {
    line-height: 1rem;
  }
</style>
