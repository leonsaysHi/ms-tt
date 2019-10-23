<template>
  <div class="d-flex align-items-stretch justify-content-center">
    <div class="flex-grow-1 p-2 border-right"><Library /></div>
    <div class="p-2 w-25"><Queue /></div>
  </div>
</template>

<script>

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
  },
  computed: {
  },
  methods: {
  },
};
</script>
