<template>
  <v-app>
    <router-view></router-view>

    <ToastNotification v-model="toast.isActive">
      {{ toast.message }}
    </ToastNotification>
  </v-app>
</template>

<script>
import ToastNotification from '@/components/ToastNotification'
import { mapState } from 'vuex'

export default {
  components: {
    ToastNotification,
  },
  computed: {
    ...mapState(['toast']),
  },
}
</script>

<style>
html {
  font-family: Avenir, 'Helvetica Neue', Arial, sans-serif;
}

.main-view {
  width: 95vw;
  margin: 24px auto;
}

/* .form > div {
  padding-bottom: 16px !important;
} */
</style>
