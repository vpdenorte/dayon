<template>
  <div class="container">
    <h1 class="py-4">Preregister</h1>

    <v-card class="pa-5" elevation="3">
      <v-form @submit.prevent="addVisitor(form)">
        <div :class="{ 'd-flex': !$vuetify.breakpoint.xs }">
          <BaseTextField
            :rules="rules.required"
            label="First name"
            v-model="form.first_name"
          />

          <v-spacer></v-spacer>

          <BaseTextField
            :rules="rules.required"
            label="Last name"
            v-model="form.last_name"
          />
        </div>

        <BaseTextField
          :rules="rules.required"
          label="Contact number"
          v-model="form.contact_number"
        />

        <BaseSelect
          multiple
          :rules="rules.required"
          label="Rooms"
          :items="rooms"
          item-text="name"
          item-value="board_id"
          v-model="form.rooms"
        />
        <v-btn depressed block color="accent" type="submit">Submit</v-btn>
      </v-form>
    </v-card>
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
        contact_number: null,
        rooms: [],
      },
    }
  },
  computed: {
    ...mapState({
      rooms: (state) => state.room.rooms,
      rules: (state) => state.rules,
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

<style scoped>
.container {
  max-width: 500px;
}
</style>
