import CardService from '@/services/CardService'

export const namespaced = true

export const state = {
  cards: [],
}

export const mutations = {
  SET_CARDS(state, value) {
    state.cards = value
  },
  APPEND_CARD(state, value) {
    state.cards.push(value)
  },
  REMOVE_CARD(state, value) {
    state.cards = state.cards.filter((el) => el.uid != value)
  },
  REPLACE_CARD(state, value) {
    const index = state.cards.findIndex((el) => el.uid == value.uid)
    state.cards.splice(index, 1, value)
  },
}

export const actions = {
  fetch({ commit, dispatch }) {
    CardService.getAll()
      .then((response) => {
        commit('SET_CARDS', response.data)
        console.log('Cards fetched', JSON.parse(JSON.stringify(response)))
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to load items', { root: true })
        console.error('Error fetching cards', JSON.parse(JSON.stringify(error)))
      })
  },
  async add({ commit, dispatch }, item) {
    try {
      const response = await CardService.add({
        uid: item.uid,
        name: item.name,
      })
      const data = response.data

      commit('APPEND_CARD', data)
      dispatch('displayToast', 'Item added successfully', { root: true })
      console.log(
        `Card ${data.uid} added`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to add card', { root: true })
      console.error(
        `Error adding card ${item.uid}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  delete({ commit, dispatch }, uid) {
    CardService.delete(uid)
      .then((response) => {
        commit('REMOVE_CARD', uid)
        dispatch('displayToast', 'Item deleted successfully', { root: true })
        console.log(`Card ${uid} deleted`, JSON.parse(JSON.stringify(response)))
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to delete card', { root: true })
        console.error(
          `Error deleting card ${uid}`,
          JSON.parse(JSON.stringify(error))
        )
      })
  },
  async update({ commit, dispatch }, item) {
    try {
      const response = await CardService.update({
        uid: item.uid,
        name: item.name,
      })
      const data = response.data

      commit('REPLACE_CARD', data)
      dispatch('displayToast', 'Item updated successfully', { root: true })
      console.log(
        `Card ${data.uid} updated`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to update card', { root: true })
      console.error(
        `Error updating card ${item.uid}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
}

export const getters = {
  getCardByUid: (state) => (uid) => {
    return state.cards.find((el) => el.uid == uid)
  },
  getInactiveCards: (state) => {
    return state.cards.filter((el) => el.visitor === null)
  },
}
