import RoomService from '@/services/RoomService'

export const namespaced = true

export const state = {
  room: {
    board_id: null,
    mac_address: null,
    name: null,
    visitors: [],
    occupants: [],
    is_accepting: null,
    capacity: null,
  },
  rooms: [],
}

export const mutations = {
  SET_ROOM(state, value) {
    state.room = value
  },
  SET_ROOMS(state, value) {
    state.rooms = value
  },
  APPEND_ROOM(state, value) {
    state.rooms.push(value)
  },
  REMOVE_ROOM(state, value) {
    state.rooms = state.rooms.filter((el) => el.board_id != value)
  },
  REPLACE_ROOM(state, value) {
    const index = state.rooms.findIndex((el) => el.board_id == value.board_id)
    state.rooms.splice(index, 1, value)
  },
}

export const actions = {
  fetch({ commit, dispatch }) {
    RoomService.getAll()
      .then((response) => {
        commit('SET_ROOMS', response.data)
        console.log('Rooms fetched', JSON.parse(JSON.stringify(response)))
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to load items', { root: true })
        console.error('Error fetching rooms', JSON.parse(JSON.stringify(error)))
      })
  },
  async fetchRoom({ commit, dispatch }, board_id) {
    try {
      const response = await RoomService.get(board_id)
      const data = response.data

      commit('SET_ROOM', data)
      console.log('Room fetched', JSON.parse(JSON.stringify(response)))

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to load room', { root: true })
      console.error('Error fetching room', JSON.parse(JSON.stringify(error)))

      return Promise.reject()
    }
  },
  async add({ commit, dispatch }, item) {
    try {
      const response = await RoomService.add({
        board_id: item.board_id,
        name: item.name,
        mac_address: item.mac_address,
      })
      const data = response.data

      commit('APPEND_ROOM', data)
      dispatch('displayToast', 'Item added successfully', { root: true })
      console.log(
        `Room ${data.board_id} added`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to add room', { root: true })
      console.error(
        `Error adding room ${item.board_id}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  delete({ commit, dispatch }, board_id) {
    RoomService.delete(board_id)
      .then((response) => {
        commit('REMOVE_ROOM', board_id)
        dispatch('displayToast', 'Item deleted successfully', { root: true })
        console.log(
          `Room ${board_id} deleted`,
          JSON.parse(JSON.stringify(response))
        )
      })
      .catch((error) => {
        dispatch('displayToast', 'Failed to delete room', { root: true })
        console.error(
          `Error deleting room ${board_id}`,
          JSON.parse(JSON.stringify(error))
        )
      })
  },
  async update({ commit, dispatch }, item) {
    try {
      const response = await RoomService.update({
        board_id: item.board_id,
        name: item.name,
        mac_address: item.mac_address,
      })
      const data = response.data

      commit('REPLACE_ROOM', data)
      dispatch('displayToast', 'Item updated successfully', { root: true })
      console.log(
        `Room ${data.board_id} updated`,
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to update room', { root: true })
      console.error(
        `Error updating room ${item.board_id}`,
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  async updateRoomAvailability(
    { commit, dispatch },
    { board_id, is_accepting }
  ) {
    try {
      const response = await RoomService.updateAvailability({
        board_id,
        is_accepting,
      })
      const data = response.data

      commit('REPLACE_ROOM', data)
      dispatch('displayToast', 'Room availability updated', { root: true })
      console.log(
        'Room availability updated',
        JSON.parse(JSON.stringify(response))
      )

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to update availability', { root: true })
      console.error(
        'Error updating room availability',
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
  async applySettings({ commit, dispatch }, { board_id, capacity }) {
    try {
      const response = await RoomService.updateSettings({ board_id, capacity })
      const data = response.data

      commit('SET_ROOM', data)
      dispatch('displayToast', 'Setting applied successfully', { root: true })
      console.log('Setting applied', JSON.parse(JSON.stringify(response)))

      return Promise.resolve()
    } catch (error) {
      dispatch('displayToast', 'Failed to apply setting', { root: true })
      console.error(
        'Error updating room availability',
        JSON.parse(JSON.stringify(error))
      )

      return Promise.reject()
    }
  },
}

export const getters = {
  getRoomByBoardId: (state) => (board_id) => {
    return state.rooms.find((el) => el.board_id == board_id)
  },
  getRoomsByBoardIds: (state) => (board_ids) => {
    return state.rooms.filter((el) => board_ids.includes(el.board_id))
  },
}
