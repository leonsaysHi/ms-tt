<template>
  <b-modal
    v-model="showModal"
    title="Edit"
    ok-title="Save"
    @ok="handleEdit"
  >
    <template v-if="value">
      <b-form-group
        label="Title"
        label-for="input-title"
      >
        <b-form-input id="input-title" v-model="value.title" :state="value.title.length > 0" trim></b-form-input>
      </b-form-group>
      <b-form-group
        label="Shout"
        label-for="input-message"
        :description="messageDescription"
      >
        <b-form-input
          id="input-message"
          v-model="value.message"
          @keyup="handleLimitMessage"
          trim></b-form-input>
      </b-form-group>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EditTune from '@/mixins/editTune';
export default {
  mixins: [EditTune],
  props: ['value'],
  data() {
    return  {
      isWorking: false,
      maxMessageLength: 50,
    }
  },
  computed: {
    ...mapState("User", {
      user: 'user',
    }),
    ...mapGetters("Playlists", {
      currentPlaylist: 'currentPlaylist',
    }),
    showModal: {
      get: function() { return this.value ? true : false },
      set: function() { }
    },
    messageDescription() {
      return (_.isString(this.value.message) ? this.value.message.length : 0) + '/' + this.maxMessageLength
    }
  },
  methods: {
    handleLimitMessage() {
      this.value.message = _.isString(this.value.message) ? this.value.message.substring(0, this.maxMessageLength) : ''
    },
    handleEdit() {
      this.isWorking = true
      this.editTune(this.currentPlaylist.id, this.value)
      .then(() => {
        this.$bvToast.toast('"' + this.value.title + '" has been edited', {
          title: 'Edited',
          variant: 'success',
          solid: true,
          appendToast: true,
        })
        this.$emit('done')
      })
    },
  },
};
</script>
