<template>
  <div class="d-flex align-items-start">
    <b-button :variant="isInQueue ? '' : 'primary'" :disabled="isInQueue" @click="$emit('add-to-queue')" size="sm" class="mr-2">+</b-button>
    <div class="title">
      <small>{{ item.user_uid }} - {{ item.date | moment("from") }}</small>
      <br><strong :class="{'text-muted': item.isWorking, 'text-danger': item.isErrored}">{{ item.title }} </strong>
    </div>
    <div class="ml-auto">
      <b-spinner v-if="item.isWorking" small variant="primary" class="ml-2"></b-spinner>
      <b-dropdown id="dropdown-1" text="..." size="sm" class="ml-2">
        <b-dropdown-item disabled>Edit</b-dropdown-item>
        <b-dropdown-item :disabled="!isOwner" @click="handleDelete"><span class="text-danger">Delete</span></b-dropdown-item>
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
  computed: {
    ...mapState("User", {
      user: state => state.user,
    }),
    ...mapState("Library", {
      queue: state => state.queue,
    }),
    isOwner() {
      return this.item.uid === this.user.uid
    },
    isInQueue() {
      return !!this.queue.find(i => i.video_id === this.item.video_id)
    },
  },
  methods: {
    ...mapActions("Library", {
      remove: 'deleteRow',
    }),
    handleDelete() {
      this.remove(this.item.video_id)
    }
  },
};
</script>

<style lang="scss" scoped>
  .title {
    line-height: 1rem;
  }
</style>