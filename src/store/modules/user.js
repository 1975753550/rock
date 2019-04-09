import Cookies from 'js-cookie'

// initial state
const state = {
  id: '',
  username: Cookies.get('username') || 'guest',
  session_id: Cookies.get('x-session-id') || '',
}

// getters
const getters = {
}

// actions
const actions = {
  changeUsername ({ state, commit }, username) {
    commit('changeUsername', { username })
  }
}

// mutations
const mutations = {
  changeUsername (state, { username }) {
    state.username = username
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}