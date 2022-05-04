<template>
  <div>
    <h2>General</h2>

    <v-list>
      <v-list-item link @click="dialog = true">
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">
            <div>Room capacity</div>
            <div>{{ room.capacity }}</div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <FormDialog v-model="dialog" @submit="apply(form)">
      <template>
        <BaseTextField v-model="form.capacity" label="Capacity" />
      </template>
    </FormDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormDialog from '@/components/FormDialog.vue'

export default {
  data() {
    return {
      dialog: false,
      form: {
        capacity: null,
      },
    }
  },
  components: {
    FormDialog,
  },
  computed: {
    roomId() {
      return this.$route.params.id
    },
    capacity() {
      return this.room.capacity
    },
    ...mapState({
      room: (state) => state.room.room,
    }),
  },
  methods: {
    apply(form) {
      this.applySettings({
        board_id: this.roomId,
        capacity: form.capacity,
      }).then(() => {
        this.dialog = false
      })
    },
    ...mapActions({
      fetchRoom: 'room/fetchRoom',
      applySettings: 'room/applySettings',
    }),
  },
  mounted() {
    this.fetchRoom(this.roomId)
  },
}
</script>

<style scoped></style>
