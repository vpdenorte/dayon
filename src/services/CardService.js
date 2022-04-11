import axios from 'axios'

let config = {
  baseURL: process.env.VUE_APP_API_URL + '/card',
}

const apiClient = axios.create(config)

export default {
  getAll() {
    return apiClient.get('/')
  },
  get(uid) {
    return apiClient.get(`/${uid}/`)
  },
  add({ uid, name }) {
    return apiClient.post('/', { uid, name })
  },
  update({ uid, name }) {
    return apiClient.put(`/${uid}/`, { uid, name })
  },
  delete(uid) {
    return apiClient.delete(`/${uid}/`)
  },
}
