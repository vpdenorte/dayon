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
      <BaseTextField
        required
        :disabled="disable.board_id"
        label="Board ID"
        v-model="form.board_id"
      />

      <BaseTextField
        required
        :disabled="disable.name"
        label="Name"
        v-model="form.name"
      />

      <BaseTextField
        required
        :disabled="disable.mac_address"
        label="MAC address"
        v-model="form.mac_address"
      />
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from '@/components/FormDialog'

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
          board_id: false,
          name: false,
          mac_address: false,
        }
      },
    },
    item: {
      type: Object,
      default() {
        return {
          board_id: null,
          name: null,
          mac_address: null,
        }
      },
    },
  },
  data() {
    return {
      form: {
        board_id: null,
        name: null,
        mac_address: null,
      },
    }
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
