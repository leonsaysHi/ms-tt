<template>
  <li class="list-group-item p-3" :class="{ 'bg-light': isCurrent }">
    <div class="d-flex align-items-start">
      <b-button :variant="isCurrent && isPlaying ? '' : 'primary'" :disabled="isCurrent && isPlaying" @click="$emit('play')" size="sm" class="mr-2">Play</b-button>
      <div class="title">
        <span>{{ owner.displayName }}</span> <small class="text-secondary">{{ item.date | moment("from") }}</small>
        <br><strong :class="{'text-muted': item.isWorking, 'text-danger': item.isErrored}">{{ item.title }} </strong>
      </div>
      <div class="ml-auto">
        <b-spinner v-if="item.isWorking || isWorking" small variant="primary" class="ml-2"></b-spinner>
        <b-dropdown id="dropdown-share" text="Share" size="sm" class="ml-2">
          <b-dropdown-item v-for="playlist in playlists" :key="playlist.id" @click="shareTune(playlist)">{{ playlist.title }}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="dropdown-actions" text="..." size="sm" class="ml-2">
          <b-dropdown-item :disabled="!isOwner" @click="$emit('delete')"><span class="text-danger">Delete</span></b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import AddTune from '@/mixins/addTune';
export default {
  name: "LibraryItem",
  mixins: [AddTune],
  props: ['item'],
  data() {
    return  {
      isWorking: false
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
    ...mapGetters("Playlists", {
      playlists: 'otherPlaylists',
    }),
    ...mapGetters("Library", {
      currentTune: 'current',
      isPlaying: 'isPlaying',
    }),
    ...mapState("Players", {
      usersList: 'rows',
    }),
    owner() {
      return this.isOwner ? this.user : _.get(this.usersList, this.item.uid, { displayName: '...' })
    },
    userId() {
      return this.user.uid
    },
    isCurrent() {
      return this.currentTune && this.currentTune.video_id === this.item.video_id
    },
    isOwner() {
      return this.item.uid === this.userId
    },
  },
  methods: {
    ...mapActions("Players", {
      getUser: 'getRow',
    }),
    shareTune(playlist) {
      this.isWorking = true
      const tune = {
        ...this.item,
        uid: this.userId,
        date: new Date().getTime(),
      }
      this.addTune( playlist.id, tune)
        .then(() => {
          this.$bvToast.toast('"' + tune.title + '" saved to '+ playlist.title, {
            title: 'Shared',
            variant: 'success',
            solid: true,
            appendToast: true,
          })
        })
        .finally(() => {
          this.isWorking = false
        })
    },
  },
};
</script>

<style lang="scss" scoped>
  .title {
    line-height: 1rem;
  }
</style>
