<template>
  <v-text-field
    outlined
    dense
    :disabled="disabled"
    :rules="rules"
    :label="label"
    :value="value"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    disabled: Boolean,
    rules: Array,
  },
}
</script>

<style scoped></style>
