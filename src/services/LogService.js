import axios from 'axios'

let config = {
  baseURL: process.env.VUE_APP_API_URL + '/log',
}

const apiClient = axios.create(config)

export default {
  getAll() {
    return apiClient.get('/')
  },
  get(id) {
    return apiClient.get(`/${id}/`)
  },
}
