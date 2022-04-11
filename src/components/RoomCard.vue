<template>
  <BaseCard>
    <template #title>{{ name }}</template>

    <template #subtitle>{{ board_id }}</template>

    <template #actions>
      <v-btn icon @click="editDialog = true">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>

      <RoomForm
        :disable="{ board_id: true }"
        ref="editDialog"
        v-model="editDialog"
        :item="{ board_id, name, mac_address }"
        @submit="edit($event)"
      >
        <template #title>Edit item</template>
      </RoomForm>

      <v-btn icon @click="deletePrompt = true" color="red">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>

      <PromptDialog v-model="deletePrompt" @confirm="deleteRoom(board_id)"
        >Are you sure you want to delete this item?</PromptDialog
      >
    </template>

    <template #expansion>
      <div class="pb-4">
        <div class="d-inline-flex align-center">
          <v-icon class="pr-2">mdi-information-outline</v-icon>
          <span class="text-subtitle-1">Room details</span>
        </div>

        <v-container class="visitor-info">
          <v-row>
            <v-col cols="4">Board ID</v-col>

            <v-col>{{ board_id }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">MAC Address</v-col>

            <v-col>{{ mac_address }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Capacity</v-col>

            <v-col>{{ capacity }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Status</v-col>

            <v-col>
              {{ is_accepting ? 'Available' : 'Unavailable' }}
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import RoomForm from '@/components/RoomForm'
import PromptDialog from '@/components/PromptDialog'
import { mapActions } from 'vuex'

export default {
  components: {
    RoomForm,
    PromptDialog,
  },
  props: {
    board_id: String,
    name: String,
    mac_address: String,
    capacity: Number,
    is_accepting: Boolean,
  },
  data() {
    return {
      editDialog: false,
      deletePrompt: false,
    }
  },
  methods: {
    edit(item) {
      this.updateRoom(item)
        .then(() => {
          this.$refs.editDialog.close()
        })
        .catch(() => {})
    },
    ...mapActions({
      updateRoom: 'room/update',
      deleteRoom: 'room/delete',
    }),
  },
}
</script>

<style scoped></style>
