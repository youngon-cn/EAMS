import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  user: {},
  snackbar: {
    show: false,
    message: '',
    timer: null
  }
}

const mutations = {
  USERINFO (state, infos) {
    state.user = infos || {}
  },
  SNACKBAR (state, message) {
    if (state.snackbar.timer) clearTimeout(state.snackbar.timer)
    if (!message) {
      state.snackbar.show = false
      return
    }
    state.snackbar = {
      show: true,
      message: message,
      timer: setTimeout(() => { state.snackbar.show = false }, 2000)
    }
  }
}

const actions = {
  getUser ({ commit }) {
    return Vue.http
      .get('/request/user')
      .then((data) => {
        commit('USERINFO', data.body.infos)
        return data.body
      }, (err) => {
        return err
      })
  },
  toogleSnackbar ({ commit }, message) {
    commit('SNACKBAR', message)
  }
}

const getters = {
  user: state => {
    return state.user
  },
  snackbar: state => {
    return state.snackbar
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
