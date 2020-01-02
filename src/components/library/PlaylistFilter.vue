<template>
  <div>
    <b-modal
      v-model="modalShow"
      title="Filtering tunes"
      ok-title="Apply"
      cancel-title="Reset"
      @show="handleShow"
      @hide="handleHide"
      @ok="handleApply"
      @cancel="resetFilter"
    >
      <b-form-group
        label="By player"
      >
        <b-form-select v-model="values.player" :options="playerOptions"></b-form-select>
      </b-form-group>
      <b-form-group label="Upvoted:">
        <b-form-checkbox v-model="values.upvoted" button :button-variant="values.upvoted ? 'primary' : 'light'">
          <heart-icon /><br>by all
        </b-form-checkbox>
        <b-form-checkbox v-model="values.upvotedByMe" button :button-variant="values.upvotedByMe ? 'primary' : 'light'" class="ml-1">
          <heart-icon /><br>by me
        </b-form-checkbox>
      </b-form-group>
    </b-modal>
    <slot v-bind:toggle="toggle" v-bind:isFiltered="isFiltered" v-bind:disabled="queueIsWorking"><b-button :variant="isFiltered ? 'primary' : 'light'" @click="toggle" :disabled="queueIsWorking"><filter-icon /></b-button></slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {

  data() {
    return  {
      modalShow: false,
      values: {
        upvoted: false,
        upvotedByMe: false,
        player: null,
      },
    }
  },
  computed: {
    ...mapState("Library", {
      queueIsWorking: 'isWorking',
    }),
    ...mapGetters("Library", {
      isFiltered: 'isFiltered',
    }),
    ...mapState("Players", {
      usersList: 'rows',
    }),
    playerOptions() {
      return this.usersList ? [ {text: 'All', value: null}, ...this.usersList.map(u => ({ value: u.uid, text: u.displayName })) ] : []
    }
  },
  methods: {
    ...mapMutations("Library", {
      applyFilters: 'setFilter',
      resetFilter: 'resetFilter',
    }),
    handleShow() {

    },
    handleHide() {

    },
    handleApply() {
      this.applyFilters(this.values)
    },
    toggle() {
      this.modalShow = true
    },
  },
}
</script>
