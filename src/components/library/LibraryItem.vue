<template>
  <li class="list-group-item p-0 d-flex align-items-stretch" :class="{ 'bg-light': isCurrent }">
    <b-button class="d-none d-lg-block align-self-center ml-2" @click="$emit('play')" :disabled="isCurrent || isError" :variant="isCurrent ? 'light' : 'primary'">
      <play-icon />
    </b-button>
    <div class="title p-2" @click="$emit('play')">
      <strong :class="{'text-muted': item.isWorking, 'text-danger': item.isError}">{{ item.title }} </strong>
      <div class="d-flex align-items-baseline">
        <small>Added by <strong><display-name :uid="item.uid" /></strong></small>
        <small class="mx-2 text-secondary">{{ item.date | moment("from") }}</small>
        <heart-icon v-if="hasVotes" class="text-danger" :size="12" />
        <heart-outline-icon v-else class="text-muted" :size="12" />
        <small :class="{'text-danger': hasVotes}" class="ml-1">{{ !item.votes ? 0 : item.votes.length }}</small>
        <small v-if="isError" class="mx-2 text-warning"><alert-icon :size="12" /></small>
      </div>
    </div>
    <div v-if="isUser" class="py-2 pr-2 ml-auto d-flex flex-column flex-lg-row align-items-center">
      <b-spinner v-if="item.isWorking || isWorking" small variant="primary" class="ml-2"></b-spinner>
      <b-dropdown id="dropdown-actions" variant="light" size="sm" class="ml-lg-2" no-caret>
        <template v-slot:button-content>
          <dots-vertical-icon />
        </template>
        <b-dropdown-item :disabled="otherPlaylists.length === 0" @click="tuneToShare = item">Send to playlist...</b-dropdown-item>
        <b-dropdown-item :disabled="!isOwner" @click="$emit('edit')">Edit</b-dropdown-item>
        <b-dropdown-item :disabled="!isOwner" @click="$emit('delete')"><span :class="{'text-danger': isOwner}">Delete</span></b-dropdown-item>
      </b-dropdown>
    </div>
    <ShareTune v-model="tuneToShare" @input="tuneToShare = null" />
  </li>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ShareTune from './ShareTune';
export default {
  name: "LibraryItem",
  components: {
    ShareTune,
  },
  props: ['item'],
  data() {
    return  {
      isWorking: false,
      tuneToShare: null,
    }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapGetters("Playlists", {
      otherPlaylists: 'otherPlaylists',
    }),
    ...mapState("Player", {
      isPlaying: 'isPlaying',
      currentTune: 'current',
    }),
    ...mapState("Players", {
      usersList: 'rows',
    }),
    isUser() {
      return this.userId || false
    },
    userId() {
      return _.get(this.user, 'uid')
    },
    isCurrent() {
      return this.currentTune && this.currentTune.video_id === this.item.video_id
    },
    isOwner() {
      return this.userId && this.item.uid === this.userId
    },
    isCurrentAndPlaying() {
      return this.isCurrent && this.isPlaying
    },
    isError() {
      return this.item.error && this.item.error === true
    },
    hasVotes() {
      return _.get(this.item, 'votes') && _.isArray(this.item.votes) && this.item.votes.length > 0
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
  .title {
    line-height: 1rem;
  }
</style>
