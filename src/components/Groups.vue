<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item p-3" v-for="row in rows" :key="row.group_id">
        <GroupItem :item="row" />
      </li>
      <li class="list-group-item p-3 d-flex">
        <div class="flex-grow-1 pr-2 border-right">
          <JoinGroup />
        </div>
        <div class="flex-grow-1 pl-2">
          <CreateGroup />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import GroupItem from './groups/GroupItem.vue';
import CreateGroup from './groups/CreateGroup.vue';
import JoinGroup from './groups/JoinGroup.vue';
import { mapState } from 'vuex';
export default {
  components: {
    GroupItem,
    CreateGroup,
    JoinGroup,
  },
  data() {
    return {
    }
  },
  async mounted () {
  },
  computed: {
    ...mapState("Groups", [
      'rows',
    ]),
  },
  methods: {
  },
};
</script>
