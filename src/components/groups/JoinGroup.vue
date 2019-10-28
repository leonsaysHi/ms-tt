<template>
  <div>
    <div class="d-flex">
      <b-form-input v-model="groupId" class="flex-grow-1 mr-2" />
      <b-button variant="primary" :disabled="isWorking" @click="handleJoinGroup">Join</b-button>
    </div>
    <div v-if="isError"><small class="text-danger">{{ isError.message }}</small></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      groupId: '',
      isWorking: false,
      isError: null,
    }
  },
  async mounted () {
  },
  computed: {
    ...mapState("Groups", {
      groupsList: 'rows',
    }),
  },
  methods: {
    ...mapMutations("Groups", {
      pushToRows: 'pushToRows'
    }),
    handleJoinGroup() {
      this.isWorking = true
      this.hasError = null
      if (this.groupsList.find( g => g.group_id === this.groupId)) {
        this.isWorking = false
        this.isError = { message: 'Already joined' }
        return
      }
      var groupRef = window.db.collection("groups").doc(this.groupId)
      groupRef.get().then((doc) => {
          if (doc.exists) {
            const
              payload = doc.data(),
              userId = firebase.auth().currentUser.uid
            payload.users.push(userId)
            groupRef.update(payload)
              .then(() => {
                this.groupId = ''
                this.isWorking = false
              })
              .catch((error) => {
                this.isError = { message: 'Error', error }
                this.isWorking = false
              });
          } else {
            this.isError = { message: 'Can not find group' }
            this.isWorking = false
          }
      }).catch((error) => {
        window.console.log("Error getting document:", error);
        this.isWorking = false
      })
    },
  },
};
</script>
