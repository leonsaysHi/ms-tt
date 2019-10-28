<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item p-3" v-for="row in rows" :key="row.group_id">
        <div class="d-flex justify-content-between">
          <strong>{{ row.title }}</strong>
          <div>
            <code class="p-1 border round">{{ row.group_id }}</code>
            <b-button class="ml-2" variant="danger" @click="quit(row.group_id)">Quit</b-button>
          </div>
        </div>
      </li>
      <li class="list-group-item p-3 d-flex">
        <b-form-input v-model="newGroupTitle" class="flex-grow-1 mr-2" />
        <b-button @click="handleSubmitGroup">Add</b-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      newGroupTitle: '',
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
    ...mapActions("Groups", {
      saveGroup: 'saveRow',
      deleteGroup: 'deleteRow',
    }),
    handleSubmitGroup() {
      this.saveGroup({ title: this.newGroupTitle })
    }
  },
};
</script>
