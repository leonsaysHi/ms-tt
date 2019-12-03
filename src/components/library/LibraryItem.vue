<template>
  <li class="list-group-item p-3" :class="{ 'bg-light': isCurrent }">
    <div class="d-flex align-items-start">
      <b-button :disabled="isCurrentAndPlaying" :variant="!isCurrentAndPlaying  ? 'primary' : ''" @click="$emit('play')" size="sm" class="mr-2"><play-icon /></b-button>
      <div class="title">
        <strong :class="{'text-muted': item.isWorking, 'text-danger': item.isErrored}">{{ item.title }} </strong>
        <br><DisplayName :uid="item.uid" /> <small class="text-secondary">{{ item.date | moment("from") }}</small>
      </div>
      <div class="ml-auto d-flex align-items-center">
        <div class="votes text-center text-muted">
          <heart-icon v-if="hasVotes" class="text-danger" />
          <heart-icon v-else />
          <small :class="{'text-danger': hasVotes}">{{ !item.votes ? 0 : item.votes.length }}</small>       
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
import DisplayName from '@/components/DisplayName';
export default {
  name: "LibraryItem",
  components: {
    ShareTune,
    DisplayName,
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
  .votes {
    > * {display:block; }
    .material-design-icon {
      line-height: 1rem;
      margin-bottom: -.33rem
    }
  }
</style>
