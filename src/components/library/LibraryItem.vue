<template>
  <li class="list-group-item p-3" :class="{ 'bg-light': isCurrent }">
    <div class="d-flex align-items-start">
      <b-button :disabled="isCurrentAndPlaying" :variant="!isCurrentAndPlaying  ? 'primary' : ''" @click="$emit('play')" size="sm" class="mr-2"><play-icon /></b-button>
      <div class="title">
        <strong :class="{'text-muted': item.isWorking, 'text-danger': item.isErrored}">{{ item.title }} </strong>
        <br><span>{{ owner.displayName }}</span> <small class="text-secondary">{{ item.date | moment("from") }}</small>
      </div>
      <div class="ml-auto d-flex align-items-center">
        <div>
          <template v-if="hasVotes">
            <small class="text-danger">{{ item.votes.length }}</small>
            <heart-icon class="text-danger" />
          </template>
          <heart-icon v-else class="text-muted" />
        </div>
        <b-spinner v-if="item.isWorking || isWorking" small variant="primary" class="ml-2"></b-spinner>
        <b-dropdown id="dropdown-actions" variant="light" size="sm" class="ml-2" no-caret>
          <template v-slot:button-content>
            <dots-vertical-icon />
          </template>
          <b-dropdown-item :disabled="otherPlaylists.length === 0 " @click="tuneToShare = item">Send to playlist...</b-dropdown-item>
          <b-dropdown-item :disabled="!isOwner" @click="$emit('delete')"><span :class="{'text-danger': isOwner}">Delete</span></b-dropdown-item>
        </b-dropdown>
      </div>
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
    ShareTune
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
    isCurrentAndPlaying() {
      return this.isCurrent && this.isPlaying
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
