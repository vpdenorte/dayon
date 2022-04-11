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
        :disabled="disable.uid"
        label="UID"
        v-model="form.uid"
      />

      <BaseTextField
        required
        :disabled="disable.name"
        label="Name"
        v-model="form.name"
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
          uid: false,
          name: false,
        }
      },
    },
    item: {
      type: Object,
      default() {
        return {
          uid: null,
          name: null,
        }
      },
    },
  },
  data() {
    return {
      form: {
        uid: null,
        name: null,
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
