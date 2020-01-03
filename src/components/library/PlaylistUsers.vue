<template>
  <div>
    <b-modal
      v-model="modalShow"
      title="Players"
      ok-title="Close"
      ok-only
    >
      <b-list-group>
        <b-list-group-item v-for="item in players" :key="item.uid" :variant="isLogged && item.uid === user.uid ? 'warning' : ''">
          <div class="d-flex align-items-start">
            <display-name :uid="item.uid" />
            <div class="ml-auto">
              <strong>{{ item.videos }} videos</strong>
              <br><span class="ml-auto">{{ item.upvotes }} upvotes</span>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-modal>
    <slot v-bind:toggle="toggle"><b-button variant="light" @click="toggle"><account-group-icon /></b-button></slot>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return  {
      modalShow: false,
    }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapGetters("User", {
      isLogged: 'isLogged',
    }),
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
    ...mapGetters("Library", {
      queue: 'queue',
    }),
    players() {
      const players = this.currentPlaylist.users || []
      return players
        .map(uid => {
          return {
            uid,
            ...this.queue.filter(v => v.uid == uid).reduce( (acc, curr) => {
              acc.videos++
              acc.upvotes += _.get(curr, 'votes', []).length
              return acc
            }, { videos: 0, upvotes: 0 })
          }
        })
        .sort(function(a, b){ return b.videos - a.videos })
    }
  },
  methods: {
    toggle() {
      this.modalShow = true
    },
  },
}
</script>
