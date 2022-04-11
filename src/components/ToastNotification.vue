<template>
  <v-snackbar :value="value" @input="$emit('input', $event)">
    <slot>{{ message }}</slot>

    <template #action="{ attrs }">
      <v-btn v-bind="attrs" @click="$emit('input', false)" text>Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    value: Boolean,
    message: String,
  },
}
</script>

<style scoped></style>
