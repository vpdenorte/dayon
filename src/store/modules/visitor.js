import VisitorService from '@/services/VisitorService'
import dayjs from 'dayjs'

export const namespaced = true

export const state = {
  visitors: [],
}

export const mutations = {
  SET_VISITORS(state, value) {
    state.visitors = value
  },
  APPEND_VISITOR(state, value) {
    state.visitors.push(value)
  },
  REMOVE_VISITOR(state, value) {
    state.visitors = state.visitors.filter((el) => el.id != value)
  },
  REPLACE_VISITOR(state, value) {
    const index = state.visitors.findIndex((el) => el.id == value.id)
    state.visitors.splice(index, 1, value)
  },
}

export const actions = {
  fetch({ commit, dispatch }) {
    VisitorService.getAll()
      .then((response) => {
        commit('SET_VISITORS', response.data)
        console.log('Visitors fetched', JSON.parse(JSON.stringify(response)))
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to load items', { root: true })
        console.error(
          'Error fetching visitors',
          JSON.parse(JSON.stringify(error))
        )
      })
  },
  async add({ commit, dispatch }, item) {
    try {
      const response = await VisitorService.add({
        first_name: item.first_name,
        last_name: item.last_name,
        contact_number: item.contact_number,
        card: item.card,
        rooms: item.rooms,
      })
      const data = response.data

      commit('APPEND_VISITOR', data)
      dispatch('displayToast', 'Item added successfully', { root: true })
      console.log(
        `Visitor ${data.id} added`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to add item', { root: true })
      console.error(
        `Error adding visitor ${item.last_name}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  delete({ commit, dispatch }, id) {
    VisitorService.delete(id)
      .then((response) => {
        commit('REMOVE_VISITOR', id)
        dispatch('displayToast', 'Item deleted successfully', { root: true })
        console.log(
          `Visitor ${id} deleted`,
          JSON.parse(JSON.stringify(response))
        )
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to delete item', { root: true })
        console.error(
          `Error deleting visitor ${id}`,
          JSON.parse(JSON.stringify(error))
        )
      })
  },
  async update({ commit, dispatch }, item) {
    try {
      const response = await VisitorService.update({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        contact_number: item.contact_number,
        card: item.card,
        rooms: item.rooms,
      })
      const data = response.data

      commit('REPLACE_VISITOR', data)
      dispatch('displayToast', 'Item updated successfully', { root: true })
      console.log(
        `Visitor ${data.id} updated`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to update item', { root: true })
      console.error(
        `Error updating visitor ${item.id}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  preregisterVisitor({ commit }, item) {
    VisitorService.preregister({
      first_name: item.first_name,
      last_name: item.last_name,
      rooms: item.rooms,
    })
      .then((response) => {
        const data = response.data

        commit('APPEND_VISITOR', data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  async linkVisitorCard({ commit, dispatch }, { id, card, duration }) {
    try {
      const expires_on = dayjs().add(duration, 'hour')
      const response = await VisitorService.linkCard({ id, card, expires_on })
      const data = response.data

      commit('REPLACE_VISITOR', data)
      dispatch('displayToast', 'Visitor linked to card successfully', {
        root: true,
      })
      console.log(
        `Visitor ${data.id} linked to card ${data.card}`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to link visitor to card', {
        root: true,
      })
      console.error(
        `Error linking visitor ${id} to card ${card}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  unlinkVisitorCard({ commit, dispatch }, id) {
    VisitorService.unlinkCard(id)
      .then((response) => {
        const data = response.data

        commit('REPLACE_VISITOR', data)
        dispatch('displayToast', 'Visitor unlinked from card successfully', {
          root: true,
        })
        console.log(
          `Visitor ${data.id} unlinked from card`,
          JSON.parse(JSON.stringify(response))
        )
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to unlink visitor from card')
        console.error(
          `Error unlinking visitor ${id} from card`,
          JSON.parse(JSON.stringify(error))
        )
      })
  },
}

export const getters = {
  getVisitorById: (state) => (id) => {
    return state.visitors.find((el) => el.id == id)
  },
}
