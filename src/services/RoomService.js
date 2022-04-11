import axios from 'axios'

let config = {
  baseURL: process.env.VUE_APP_API_URL + '/room',
}

const apiClient = axios.create(config)

export default {
  getAll() {
    return apiClient.get('/')
  },
  get(board_id) {
    return apiClient.get(`/${board_id}/`)
  },
  add({ board_id, name, mac_address }) {
    return apiClient.post('/', { board_id, name, mac_address })
  },
  update({ board_id, name, mac_address }) {
    return apiClient.put(`/${board_id}/`, { board_id, name, mac_address })
  },
  delete(board_id) {
    return apiClient.delete(`/${board_id}/`)
  },
  updateAvailability({ board_id, is_accepting }) {
    return apiClient.patch(`/${board_id}/`, { is_accepting })
  },
}
