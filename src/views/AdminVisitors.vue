<template>
  <div class="card-view">
    <div class="d-flex justify-space-between align-end pb-4">
      <h1>Visitors</h1>

      <div>
        <v-btn depressed @click.stop="addDialog = true">
          <v-icon left>mdi-plus</v-icon>
          Add
        </v-btn>

        <VisitorForm ref="addDialog" v-model="addDialog" @submit="add($event)">
          <template #title>Add item</template>
        </VisitorForm>
      </div>
    </div>

    <VisitorCard
      v-for="visitor in visitors"
      :key="visitor.id"
      v-bind="visitor"
    />
  </div>
</template>

<script>
import VisitorForm from '@/components/VisitorForm'
import VisitorCard from '@/components/VisitorCard'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    VisitorCard,
    VisitorForm,
  },
  data() {
    return {
      expanded: false,
      addDialog: false,
      logFetchInterval: null,
    }
  },
  computed: {
    ...mapState({
      visitors: (state) => state.visitor.visitors,
    }),
  },
  methods: {
    add(item) {
      this.addVisitor(item)
        .then(() => {
          this.$refs.addDialog.close()
        })
        .catch(() => {})
    },
    ...mapActions({
      fetchVisitors: 'visitor/fetch',
      fetchCards: 'card/fetch',
      fetchRooms: 'room/fetch',
      fetchLogs: 'log/fetch',
      addVisitor: 'visitor/add',
    }),
  },
  created() {
    this.fetchVisitors()
    this.fetchCards()
    this.fetchRooms()
    this.fetchLogs()
  },
  // mounted() {
  //   this.logFetchInterval = setInterval(() => {
  //     this.fetchLogs()
  //   }, 15000)
  // },
  // beforeDestroy() {
  //   clearInterval(this.logFetchInterval)
  // },
}
</script>

<style scoped>
/* .card-view {
  max-width: 50vw;
  margin: 0 auto;
} */
</style>
