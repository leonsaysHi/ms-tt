<template>
  <div>
    <div v-if="currentTune" class="border-top my-1 pt-2">
      <div>
        <div class="text-muted"><small>Now playing:</small></div>
        <div class="d-flex align-items-start">
          <div class="title">
            <strong>{{ currentTune.title }} </strong>
            <br><span>{{ owner.displayName }}</span> <small class="text-secondary">{{ currentTune.date | moment("from") }}</small>
          </div>
          <div class="ml-auto">
            <b-link @click="toggleVote" :class="{ 'text-muted': !hasOwnerUpvoted, 'text-danger': hasOwnerUpvoted }">
              <heart-icon v-if="hasOwnerUpvoted" />
              <heart-outline-icon v-else />
            </b-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VoteTune from '@/mixins/voteTune';
export default {
  mixins: [VoteTune],
  data() {
    return { }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapState("Playlists", {
      playlistId: 'currentId',
    }),
    ...mapState("Players", {
      usersList: 'rows',
    }),
    ...mapGetters("Library", {
      currentTune: 'current',
    }),
    isOwner() {
      return this.currentTune.uid === this.user.uid
    },
    hasOwnerUpvoted() {
      return this.currentTune.votes && this.currentTune.votes.includes(this.user.uid)
    },
    owner() {
      return this.isOwner ? this.user : _.get(this.usersList, this.currentTune.uid, { displayName: '...' })
    },
  },
  methods: {
    toggleVote() {
      this.voteTune(this.playlistId, this.currentTune.video_id, this.user.uid)
    }
  }
};
</script>

<style lang="scss" scoped>
  .title {
    line-height: 1rem;
  }
</style>
