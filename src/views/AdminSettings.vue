<template lang="">
  <div>
    <h1>Settings</h1>
    <v-list>
      <v-list-item>
        <v-icon class="pr-4">mdi-alert-outline</v-icon>

        <v-list-item-content>
          <v-list-item-title>Emergency mode</v-list-item-title>

          <v-list-item-subtitle>Unlock all doors</v-list-item-subtitle>
        </v-list-item-content>

        <v-spacer />

        <v-switch
          v-model="settings.emergencyMode"
          @click="$store.dispatch('applySettings', settings)"
        />
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        emergencyMode: null,
      },
    }
  },
}
</script>

<style lang=""></style>
