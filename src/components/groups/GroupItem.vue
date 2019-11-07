<template>
  <div class="d-flex justify-content-between">
    <strong>{{ item.title }}</strong>
    <div>
      <code class="p-1 border round">{{ item.group_id }}</code>
      <b-button class="ml-2" :disabled="isWorking" variant="danger" @click="quitGroup">Quit</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['item'],
  data() {
    return {
      isWorking: false,
      isQuitingError: null,
    }
  },
  async mounted () {
  },
  computed: {
    ...mapGetters("User", {
      userId: 'uid',
    }),
  },
  methods: {
    quitGroup() {
      this.isQuitingError = null
      var groupRef = window.db.collection("groups").doc(this.item.group_id)
      groupRef.get().then((doc) => {
          if (doc.exists) {
            const
              payload = doc.data(),
              userId = this.userId
            payload.users = payload.users.filter( u => u !== userId)
            if (payload.users.length) {
              groupRef.update(payload)
                .then(() => {
                  this.groupId = ''
                  this.isWorking = false
                })
                .catch((error) => {
                  this.isQuitingError = { message: 'Error', error }
                  this.isWorking = false
                })
            }
            else {
              groupRef.delete()
                .then(() => {
                  this.groupId = ''
                  this.isWorking = false
                })
                .catch((error) => {
                  this.isQuitingError = { message: 'Error', error }
                  this.isWorking = false
                })
            }
          } else {
            this.isQuitingError = { message: 'Can not find group' }
            this.isWorking = false
          }
      }).catch((error) => {
        this.isQuitingError = { message: 'Error', error }
        window.console.log("Error getting document:", error);
        this.isWorking = false
      })
    },
  },
};
</script>
