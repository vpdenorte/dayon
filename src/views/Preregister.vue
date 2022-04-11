<template>
  <div>
    <v-form @submit.prevent="addVisitor(form)">
      <div class="d-flex">
        <BaseTextField required label="First name" v-model="form.first_name" />

        <v-spacer></v-spacer>

        <BaseTextField required label="Last name" v-model="form.last_name" />
      </div>

      <BaseSelect
        multiple
        required
        label="Rooms"
        :items="rooms"
        item-text="name"
        item-value="board_id"
        v-model="form.rooms"
      />

      <v-btn type="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        card: null,
        rooms: [],
      },
    }
  },
  computed: {
    ...mapState({
      rooms: (state) => state.room.rooms,
    }),
  },
  methods: {
    ...mapActions({
      fetchRooms: 'room/fetch',
      addVisitor: 'visitor/add',
    }),
  },
  created() {
    this.fetchRooms()
  },
}
</script>

<style scoped></style>
