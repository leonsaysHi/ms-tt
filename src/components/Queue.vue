<template>
  <div class="p-2">
    <Controls />
    <youtube
      ref="youtube"
      class="w-100"
      :player-vars="playerVars"
    ></youtube>
    <div
      v-for="(item, idx) in queuedVideos"
      :key="item.id"
      class="py-2 border-bottom"
    >
      <PlayerItem
        :item="item"
        :current="idx === 0"
        :ref="item.id"
      />
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
        // controls: 0,
        modestbranding: 1,
      },
    }
  },
  async mounted () {
    this.player.addEventListener('onStateChange', this.youtubeControl);
    // const totalTime = await this.player.getDuration();
    if (this.currentVideo) {
      this.player.loadVideoById(this.currentVideo.videoId)
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
      }))
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
        this.player.loadVideoById(newVal.videoId)
      }
    }
  },
  methods: {
    ...mapMutations([
      'removeFromQueue'
    ]),
    ended() {
      this.removeFromQueue(this.control.currentItem)
    },
    youtubeControl (youtubeState) {
      /**
       * Youtube States:
       *  -1 - unstarted
       *  0 - ended
       *  1 - playing
       *  2 - paused
       *  3 - buffering
       *  5 - video cued
       */
      if (youtubeState.data === 0) {
        this.ended()
      }
      if (youtubeState.data === 1) {
        // this.updateVideoCurrentTime()
      }
    },
  },
};
</script>
