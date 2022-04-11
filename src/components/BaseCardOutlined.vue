<template>
  <v-card outlined class="mb-4">
    <v-card-title>
      <slot name="title"> </slot>
    </v-card-title>

    <v-card-subtitle>
      <slot name="subtitle"> </slot>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {}
</script>

<style scoped></style>
