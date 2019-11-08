<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item p-3" v-for="row in rows" :key="row.id">
        <Item :item="row" />
      </li>
      <li class="list-group-item p-3 d-flex">
        <div class="flex-grow-1 pr-2 border-right">
          <JoinForm />
        </div>
        <div class="flex-grow-1 pl-2">
          <CreateForm />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Item from './playlists/Item.vue';
import CreateForm from './playlists/CreateForm.vue';
import JoinForm from './playlists/JoinForm.vue';
import { mapState } from 'vuex';
export default {
  components: {
    Item,
    CreateForm,
    JoinForm,
  },
  data() {
    return {
    }
  },
  async mounted () {
  },
  computed: {
    ...mapState("Playlists", [
      'rows',
    ]),
  },
  methods: {
  },
};
</script>
