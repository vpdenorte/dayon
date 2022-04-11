<template>
  <FormDialog
    ref="dialog"
    :value="value"
    @input="$emit('input', $event)"
    @submit="$emit('submit', form)"
  >
    <template #title>
      <slot name="title"></slot>
    </template>

    <template>
      <div class="d-flex">
        <BaseTextField
          :rules="rules.required"
          label="First name"
          v-model="form.first_name"
        />

        <div class="px-2"></div>

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
        :disabled="disable.card"
        label="Card"
        :items="cards"
        item-text="name"
        item-value="uid"
        v-model="form.card"
      />

      <BaseSelect
        multiple
        :disabled="disable.rooms"
        :rules="rules.required"
        label="Rooms"
        :items="rooms"
        item-text="name"
        item-value="board_id"
        v-model="form.rooms"
      />
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from '@/components/FormDialog'
import { mapState } from 'vuex'

export default {
  components: {
    FormDialog,
  },
  props: {
    value: Boolean,
    disable: {
      type: Object,
      default() {
        return {
          first_name: false,
          last_name: false,
          contact_number: false,
          card: false,
          rooms: false,
        }
      },
    },
    item: {
      type: Object,
      default() {
        return {
          first_name: null,
          last_name: null,
          contact_number: null,
          card: null,
          rooms: [],
        }
      },
    },
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    ...mapState({
      cards: (state) => state.card.cards,
      rooms: (state) => state.room.rooms,
      rules: (state) => state.rules,
    }),
  },
  methods: {
    close() {
      this.$refs.dialog.close()
    },
    reset() {
      this.form = { ...this.item }
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.reset()
      }
    },
  },
}
</script>

<style scoped></style>
