<template>
  <div class="room-view">
    <div class="d-flex justify-space-between align-end pb-4">
      <h1>Rooms</h1>

      <div>
        <v-btn depressed @click.stop="addDialog = true">
          <v-icon left>mdi-plus</v-icon>
          Add
        </v-btn>

        <RoomForm ref="addDialog" v-model="addDialog" @submit="add($event)">
          <template #title>Add item</template>
        </RoomForm>
      </div>
    </div>

    <RoomCard v-for="room in rooms" :key="room.board_id" v-bind="room" />
  </div>
</template>

<script>
import RoomForm from '@/components/RoomForm'
import RoomCard from '@/components/RoomCard'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    RoomCard,
    RoomForm,
  },
  data() {
    return {
      expanded: false,
      addDialog: false,
    }
  },
  computed: {
    ...mapState({
      rooms: (state) => state.room.rooms,
    }),
  },
  methods: {
    add(item) {
      this.addRoom(item)
        .then(() => {
          this.$refs.addDialog.close()
        })
        .catch(() => {})
    },
    ...mapActions({
      fetchRooms: 'room/fetch',
      addRoom: 'room/add',
    }),
  },
  created() {
    this.fetchRooms()
  },
}
</script>

<style scoped>
/* .card-view {
  max-width: 50vw;
  margin: 0 auto;
} */
</style>
