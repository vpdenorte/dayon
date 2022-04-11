import LogService from '@/services/LogService'

export const namespaced = true

export const state = {
  logs: [],
}

export const mutations = {
  SET_LOGS(state, value) {
    state.logs = value
  },
}

export const actions = {
  fetch({ commit }) {
    LogService.getAll()
      .then((response) => {
        commit('SET_LOGS', response.data.reverse())
        console.log('Logs fetched', JSON.parse(JSON.stringify(response)))
      })
      .catch((error) => {
        console.error('Error fetching logs', JSON.parse(JSON.stringify(error)))
      })
  },
}

export const getters = {
  getLogsByVisitor: (state) => (id) => {
    return state.logs.filter((el) => el.visitor == id)
  },
}
