<template>
  <div>
    <Controls />
    <youtube
      ref="youtube"
      class="w-100"
      :player-vars="playerVars"
    ></youtube>
    <div
      v-for="(item) in queuedVideos"
      :key="item.video_id"
      class="py-2 border-bottom"
    >
      <PlayerItem :item="item" />
    </div>
  </div>
</template>

<script>
import Controls from "./Controls";
import PlayerItem from "./PlayerItem";
import { mapState, mapMutations } from 'vuex';
export default {
  name: "Queue",
  components: {
    Controls,
    PlayerItem,
  },
  data() {
    return {
      playerVars: {
        width: "100%",
        resize: true,
        controls: 0,
        modestbranding: 1,
      },
    }
  },
  async mounted () {
    this.player.addEventListener('onStateChange', this.playerChange);
    this.player.addEventListener('onError', this.playerError);
    // const totalTime = await this.player.getDuration();
    if (this.currentVideo) {
      this.player.loadVideoById(this.currentVideo.video_id)
    }
  },
  computed: {
    ...mapState([
      'queue',
      'control',
    ]),
    queuedVideos() {
      return this.queue.map(item => ({
        ...item
      })).slice(1)
    },
    currentVideo() {
      return this.control.currentItem
    },
    player () {
      return this.$refs.youtube.player
    }
  },
  watch: {
    currentVideo: function(newVal) {
      if (newVal) {
        this.player.loadVideoById(newVal.video_id)
      }
    }
  },
  methods: {
    ...mapMutations([
      'removeFromQueue',
    ]),
    ended() {
      this.removeFromQueue(this.control.currentItem)
    },
    playerError (error) {
      window.console.log('Error', error)
      this.removeFromQueue(this.control.currentItem)
    },
    playerChange (state) {
      /**
       * Youtube States:
       *  -1 - unstarted
       *  0 - ended
       *  1 - playing
       *  2 - paused
       *  3 - buffering
       *  5 - video cued
       */
      if (state.data === 0) {
        this.ended()
      }
      if (state.data === 1) {
        // this.updateVideoCurrentTime()
      }
      window.console.log(state.target.getVideoData())
    },
  },
};
</script>
