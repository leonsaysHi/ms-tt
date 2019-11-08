<template>
  <div class="d-flex justify-content-between">
    <h2>{{ currentGroup.title }}</h2>
    <b-button @click="$emit('add')">Add tune</b-button>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "LibraryHeader",
  data() {
    return  {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters("Groups", {
      currentGroup: 'currentGroup',
    }),
  },
};
</script>
