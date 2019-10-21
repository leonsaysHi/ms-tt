<template>
  <div>
    <div>
      <youtube 
        ref="youtube"
        :video-id="item.videoId" 
        :player-vars="playerVars" 
        @ended="ended(item)" 
      ></youtube>
    </div>
    <div>{{ item.title }} / {{ currentTime }}</div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "PlayerItem",
  props: ['item'],
  data() {
    return {
      playerVars: {
        width: "100%",
        resize: true,
      },
    }
  },
  computed: {
    currentTime() {
      console.log(this.$refs['youtube'])
      return this.$refs['youtube'] ? _.get(this.$refs['youtube'], 'getCurrentTime', '??') : '-'
    },
  },
  methods: {
    ended(item) {
      this.$emit('ended')
    },
  },
};
</script>
