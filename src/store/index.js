import Vue from 'vue'
import Vuex from 'vuex'
import * as card from './modules/card'
import * as room from './modules/room'
import * as visitor from './modules/visitor'
import * as log from './modules/log'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    card,
    room,
    visitor,
    log,
  },
  state: {
    toast: {
      isActive: false,
      message: null,
    },
    rules: {
      required: [
        (v) => !!v || 'This field is required',
        (v) => (v && v.length > 0) || 'This field is required',
      ],
    },
    settings: {
      emergencyMode: null,
    },
  },
  mutations: {
    setToastState(state, value) {
      state.toast.isActive = value
    },
    setToastMessage(state, value) {
      state.toast.message = value
    },
    setSettings(state, value) {
      state.settings = value
    },
  },
  actions: {
    displayToast({ commit }, message) {
      commit('setToastMessage', message)
      commit('setToastState', true)
    },
    applySettings({ commit, dispatch }, settings) {
      commit('setSettings', settings)
      dispatch('displayToast', 'Settings applied')
    },
  },
  getters: {
    getCardByUid: (state) => (uid) => {
      return state.cards.find((card) => card.uid == uid)
    },
  },
})
