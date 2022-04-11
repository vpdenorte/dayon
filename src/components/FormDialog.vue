<template>
  <v-dialog :value="value" @input="$emit('input', $event)" width="480">
    <v-card>
      <v-form ref="form" v-model="isValid" @submit.prevent="validate()">
        <v-card-title>
          <slot name="title"></slot>
        </v-card-title>

        <div class="px-6 form">
          <slot></slot>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn depressed @click="close()">Cancel</v-btn>

          <v-btn depressed color="accent" type="submit"> OK </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      isValid: false,
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    clearForm() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    validate() {
      this.$refs.form.validate()
      this.isValid && this.$emit('submit')
    },
  },
  watch: {
    value(val) {
      // On close
      if (!val) {
        this.clearForm()
      }
    },
  },
}
</script>

<style scoped></style>
