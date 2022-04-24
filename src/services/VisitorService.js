import axios from 'axios'

let config = {
  baseURL: process.env.VUE_APP_API_URL + '/visitor',
}

const apiClient = axios.create(config)

export default {
  getAll() {
    return apiClient.get('/')
  },
  get(id) {
    return apiClient.get(`/${id}/`)
  },
  add({ first_name, last_name, contact_number, rooms }) {
    return apiClient.post('/', {
      first_name,
      last_name,
      contact_number,
      rooms,
    })
  },
  update({ id, first_name, last_name, contact_number, card, rooms }) {
    return apiClient.put(`/${id}/`, {
      id,
      first_name,
      last_name,
      contact_number,
      card,
      rooms,
    })
  },
  delete(id) {
    return apiClient.delete(`/${id}/`)
  },
  preregister({ first_name, last_name, rooms }) {
    return apiClient.post('/', { first_name, last_name, rooms })
  },
  linkCard({ id, card, expires_on }) {
    return apiClient.patch(`/${id}/`, { card, expires_on })
  },
  unlinkCard(id) {
    return apiClient.patch(`/${id}/`, { card: null, expires_on: null })
  },
}
