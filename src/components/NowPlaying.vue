<template>
  <div>
    <div v-if="currentTune" class="border-top my-1 pt-2">
      <div>
        <div class="text-muted"><small>Now playing:</small></div>
        <div class="">
          <div class="title d-flex align-items-start">
            <div><strong>{{ currentTune.title }} </strong></div>
            <div class="ml-auto upvote" :class="{'-busy': voteIsWorking}" v-if="isLogged">
              <b-link @click="toggleVote" :class="{ 'text-muted': !hasOwnerUpvoted, 'text-danger': hasOwnerUpvoted }">
                <heart-icon v-if="hasOwnerUpvoted" />
                <heart-outline-icon v-else />
              </b-link>
              <div class="spinner" v-if="voteIsWorking"><b-spinner small variant="muted"></b-spinner></div>
            </div>
          </div>
          <div v-if="currentTune.message" class="border rounded bg-light my-1 p-1">{{ currentTune.message }}</div>
          <div><span>by {{ owner.displayName }}</span> <small class="text-secondary">{{ currentTune.date | moment("from") }}</small></div>
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
    return {
      voteIsWorking: false
    }
  },
  computed: {
    ...mapGetters("User", {
      isLogged: 'isLogged',
    }),
    ...mapState("User", {
      user: 'user',
    }),
    ...mapState("Playlists", {
      playlistId: 'currentId',
    }),
    ...mapState("Players", {
      usersList: 'rows',
    }),
    ...mapState("Player", {
      currentTune: 'current',
    }),
    isUser() {
      return this.user && this.user.uid ? true : false
    },
    isOwner() {
      return this.isLogged ? this.currentTune.uid === this.user.uid : false
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
      this.voteIsWorking = true
      this.voteTune(this.playlistId, this.currentTune.video_id, this.user.uid)
        .then(()=>{
          this.voteIsWorking = false
        })

    }
  }
};
</script>

<style lang="scss" scoped>
  .title {
    line-height: 1rem;
  }
  .upvote {
    position: relative;
    &.-busy a { opacity: .2 }
    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
