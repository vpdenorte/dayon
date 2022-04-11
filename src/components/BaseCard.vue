<template>
  <div class="px-4">
    <v-hover v-slot="{ hover }">
      <v-card
        hover
        @click.native="isExpanded = !isExpanded"
        @hover="isActionsVisible = true"
        class="mb-4"
      >
        <div class="d-flex justify-space-between">
          <div>
            <v-card-title>
              <slot name="title"></slot>
            </v-card-title>

            <v-card-subtitle>
              <slot name="subtitle"></slot>
            </v-card-subtitle>
          </div>

          <div class="d-flex align-center pr-2">
            <slot name="info"></slot>

            <div class="d-flex">
              <div v-show="isExpanded || hover">
                <slot name="actions"></slot>
              </div>

              <v-btn icon>
                <v-icon>
                  {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <v-expand-transition>
          <div v-show="isExpanded">
            <v-divider></v-divider>

            <v-card-text>
              <slot name="expansion"></slot>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      isActionsVisible: false,
    }
  },
}
</script>

<style scoped></style>
