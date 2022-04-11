<template>
  <BaseCard>
    <template #title>{{ name }}</template>

    <template #subtitle>{{ uid }}</template>

    <template #actions>
      <v-btn icon @click.stop="editDialog = true">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>

      <CardForm
        :disable="{ uid: true }"
        ref="editDialog"
        v-model="editDialog"
        :item="{ uid, name }"
        @submit="edit($event)"
      >
        <template #title>Edit item</template>
      </CardForm>

      <v-btn icon @click.stop="deletePrompt = true" color="red">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>

      <PromptDialog v-model="deletePrompt" @confirm="deleteCard(uid)"
        >Are you sure you want to delete this item?</PromptDialog
      >
    </template>

    <template #expansion>
      <div class="pb-4">
        <div class="d-inline-flex align-center">
          <v-icon class="pr-2">mdi-information-outline</v-icon>
          <span class="text-subtitle-1">Card details</span>
        </div>

        <v-container class="visitor-info">
          <v-row>
            <v-col cols="4">UID</v-col>

            <v-col>{{ uid }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Linked visitor</v-col>

            <v-col>{{ visitor ? visitor.last_name : 'None' }}</v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import CardForm from '@/components/CardForm'
import PromptDialog from '@/components/PromptDialog'
import { mapActions } from 'vuex'

export default {
  components: {
    CardForm,
    PromptDialog,
  },
  props: {
    uid: String,
    name: String,
    visitor: Object,
  },
  data() {
    return {
      editDialog: false,
      deletePrompt: false,
    }
  },
  methods: {
    edit(item) {
      this.updateCard(item)
        .then(() => {
          this.$refs.editDialog.close()
        })
        .catch(() => {})
    },
    ...mapActions({
      updateCard: 'card/update',
      deleteCard: 'card/delete',
    }),
  },
}
</script>

<style scoped></style>
