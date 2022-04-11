<template>
  <div>
    <div class="d-flex justify-space-between align-center pb-6">
      <h1>{{ room.name }}</h1>

      <div class="d-flex align-center">
        <div>Available</div>

        <v-switch
          hide-details
          v-model="switchAvailability"
          @change="setAvailability(switchAvailability)"
          class="pa-0 ma-0 pl-2 mr-n2"
        ></v-switch>
      </div>
    </div>

    <div class="pb-4">
      <div class="d-flex justify-space-between">
        <div class="pb-2">Occupants</div>

        <div class="counter">
          <span>{{ room.occupants.length }}</span>

          <span>/</span>

          <span>{{ room.capacity }}</span>
        </div>
      </div>

      <div v-if="room.occupants.length > 0">
        <BaseCardOutlined v-for="visitor in room.occupants" :key="visitor.id">
          <template #title>
            {{ getFullName(visitor.first_name, visitor.last_name) }}
          </template>

          <template #subtitle>{{ visitor.contact_number }}</template>
        </BaseCardOutlined>
      </div>

      <div v-else class="text-center">No items to show.</div>
    </div>

    <div>
      <div class="pb-2">Scheduled visitors</div>

      <div v-if="visitorsFiltered.length > 0">
        <BaseCardOutlined v-for="visitor in visitorsFiltered" :key="visitor.id">
          <template #title>
            {{ getFullName(visitor.first_name, visitor.last_name) }}
          </template>

          <template #subtitle>{{ visitor.contact_number }}</template>
        </BaseCardOutlined>
      </div>

      <div v-else class="text-center">No items to show.</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      switchAvailability: null,
      roomFetchInterval: null,
    }
  },
  computed: {
    roomId() {
      return this.$route.params.id
    },
    visitorsFiltered() {
      const occupants = this.room.occupants.map((el) => el.id)

      return this.room.visitors.filter((el) => !occupants.includes(el.id))
    },
    ...mapState({
      room: (state) => state.room.room,
    }),
  },
  methods: {
    getFullName(firstName, lastName) {
      return `${lastName}, ${firstName}`
    },
    setAvailability(value) {
      this.updateRoomAvailability({
        board_id: this.roomId,
        is_accepting: value,
      }).catch(() => {
        this.switchAvailability = !value
      })
    },
    ...mapActions({
      fetchRoom: 'room/fetchRoom',
      updateRoomAvailability: 'room/updateRoomAvailability',
    }),
  },
  created() {
    this.fetchRoom(this.roomId).then(() => {
      this.switchAvailability = this.room.is_accepting
    })
  },
  mounted() {
    this.roomFetchInterval = setInterval(() => {
      this.fetchRoom(this.roomId)
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.roomFetchInterval)
  },
}
</script>

<style scoped></style>
