<template>
    <div class="flex-grow-1 d-flex align-items-stretch justify-content-center">
      <template v-if="currentGroup">
        <div class="d-flex flex-column align-items-stretch flex-grow-1 p-2 border-right"><Library :key="currentGroupId" /></div>
        <div class="d-flex flex-column align-items-stretch p-2 w-25"><Queue :key="currentGroupId" /></div>
      </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Queue from "@/components/Queue";
import Library from "@/components/Library";
export default {
  name: "Main",
  components: {
    Library,
    Queue,
  },
  data() {
    return  {
    }
  },
  created() {
    if (this.$route.params.group_id) {
      this.setCurrentGroupId(this.$route.params.group_id)
    }
  },
  watch: {
    currentGroupId: function(val) {
      if (val) {
        this.setCurrentGroupId(val)
      }
    }
  },
  computed: {
    currentGroupId() {
      return this.$route.params.group_id
    },
    ...mapGetters("Groups", {
      currentGroup: 'currentGroup',
    }),
  },
  methods: {
    ...mapMutations("Groups", {
      setCurrentGroupId: 'setCurrent',
    }),
  },
};
</script>
