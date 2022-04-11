<template>
  <v-select
    outlined
    dense
    deletable-chips
    :rules="rules"
    :disabled="disabled"
    :multiple="multiple"
    :small-chips="multiple"
    :label="label"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :value="value"
    @input="$emit('input', $event)"
  ></v-select>
</template>

<script>
export default {
  props: {
    value: [String, Number, Array],
    label: String,
    items: Array,
    itemText: String,
    itemValue: String,
    disabled: Boolean,
    multiple: Boolean,
    rules: Array,
  },
}
</script>

<style scoped></style>
