<template>
  <div>
    <div class="video" :class="{'-collapsed': !isHeadOfQueue}">
      <youtube
        ref="youtube"
         class="w-100"
        :video-id="item.videoId"
        :player-vars="playerVars"
      ></youtube>
    </div>
    <div v-if="!isHeadOfQueue" class="d-flex justify-content-between">
      <div><span v-if="youtubeState === 1" class="text-muted">Playing:</span> {{ item.title }} </div>
      <div><a @click="remove">&times;</a></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "PlayerItem",
  props: ['item'],
  data() {
    return {
      youtubeState: null,
      timeId: null,
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
    this.updateVideoPlayingState()
  },
  computed: {
    ...mapState([
      'control'
    ]),
    isHeadOfQueue() {
      return this.control.currentItem.id === this.item.id
    },
    player () {
      return this.$refs.youtube.player
    },
    isPlaying() {
      return this.youtubeState === 1 || this.youtubeState === 2
    },
  },
  watch: {
    isHeadOfQueue: function(newVal) {
      if (newVal) {
        this.updateVideoPlayingState()
      }
    }
  },
  methods: {
    ...mapMutations([
      'removeFromQueue'
    ]),
    ended() {
      this.removeFromQueue(this.item)
    },
    remove() {
      this.removeFromQueue(this.item)
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
      this.youtubeState = youtubeState.data
      if (this.youtubeState === 0) {
        this.ended()
      }
      if (this.youtubeState === 1) {
        // this.updateVideoCurrentTime()
      }
    },
    updateVideoPlayingState() {
      if (this.isHeadOfQueue && this.youtubeState !== 1) {
        this.player.playVideo()
      }
    },
    updateVideoCurrentTime() {
			// this.timeId = setInterval(() => {
			// 	this.player.getCurrentTime().then((currentTime) => {
      //     this.setControlInfos({ currentTime })
			// 	});
			// }, 100);
		},
  },
};
</script>

<style lang="scss" scoped>
  .video {
    overflow: hidden;
    max-height: 500px;
    animation: .5s max-height;
    &.-collapsed {
      max-height: 0;
    }
  }
</style>
