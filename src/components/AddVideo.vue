<template>
  <div>
    <b-form-group
        label="Add video"
        label-for="input-add"
        :state="state"
      >
        <b-form-input id="input-add" v-model="videoUrl" :state="state" trim></b-form-input>
    </b-form-group>
    <div class="d-flex">
      <youtube
        ref="youtube"
        :player-vars="playerVars"
      ></youtube>
      <div class="p-2 flex-grow-1" v-if="videoDatas && videoDatas.title.length > 0">
        <b-form-group
            label="Title"
            label-for="input-title"
          >
            <b-form-input id="input-title" v-model="videoDatas.title" :state="state" trim></b-form-input>
        </b-form-group>
        <button class="btn btn-primary" @click="addVideo">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "AddVideo",
  data() {
    return  {
      videoUrl: '',
      videoDatas: null,
      state: null,
      playerVars: {
        autoplay: 0,
        width: 250,
        height: 150,
        controls: 0,
        modestbranding: 1,
      },
    }
  },
  async mounted () {
    this.player.addEventListener('onStateChange', this.playerChange);
    this.player.addEventListener('onError', this.playerError);
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    },
  },
  watch: {
    videoUrl: function(value) {
      value = value.trim()
      if (value.length) {
        const groups = value.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/)
        this.videoDatas = null
        this.player.loadVideoById(groups[2] || value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'pushToLibrary',
    ]),
    playerError (error) {
      window.console.log('Error', error)
    },
    playerChange (state) {
      window.console.log('Success', state.target.getVideoData())
      this.videoDatas = state.target.getVideoData()
    },
    addVideo () {
      this.pushToLibrary(this.videoDatas)
    }
  },
};
</script>
