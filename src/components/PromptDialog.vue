<template>
  <v-dialog
    width="50vw"
    :value="value"
    @input="$emit('input', $event)"
    @keydown.enter="$emit('confirm') && close()"
  >
    <v-card>
      <v-card-title class="px-6 text-body-1">
        <slot></slot>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn depressed @click="close()">Cancel</v-btn>

        <v-btn depressed color="accent" @click="$emit('confirm') && close()">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
  },
}
</script>

<style scoped></style>
