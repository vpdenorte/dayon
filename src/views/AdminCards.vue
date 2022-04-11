<template>
  <div class="card-view">
    <div class="d-flex justify-space-between align-end pb-4">
      <h1>Cards</h1>

      <div>
        <v-btn depressed @click.stop="addDialog = true">
          <v-icon left>mdi-plus</v-icon>
          Add
        </v-btn>

        <CardForm ref="addDialog" v-model="addDialog" @submit="add($event)">
          <template #title>Add item</template>
        </CardForm>
      </div>
    </div>

    <CardCard v-for="card in cards" :key="card.uid" v-bind="card" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import CardCard from '@/components/CardCard'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CardCard,
    CardForm,
  },
  data() {
    return {
      expanded: false,
      addDialog: false,
    }
  },
  computed: {
    ...mapState({
      cards: (state) => state.card.cards,
    }),
  },
  methods: {
    add(item) {
      this.addCard(item)
        .then(() => {
          this.$refs.addDialog.close()
        })
        .catch(() => {})
    },
    ...mapActions({
      fetchCards: 'card/fetch',
      addCard: 'card/add',
    }),
  },
  created() {
    this.fetchCards()
  },
}
</script>

<style scoped>
/* .card-view {
  max-width: 50vw;
  margin: 0 auto;
} */
</style>
