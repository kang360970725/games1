const state = {
  isLogin: !!localStorage.sessionId
}

const mutations = {
  loginStatus (state, status) {
    state.isLogin = status
  }
}

const actions = {
  setLoginStatus ({commit}, sessionInfo) {
    localStorage.sessionId = sessionInfo.sessionId
    localStorage.userId = sessionInfo.userId
    localStorage.userName = sessionInfo.userName

    commit('loginStatus', true)
  },
  setLogout ({commit}) {
    localStorage.sessionId = ''
    localStorage.userId = ''
    localStorage.userName = ''

    commit('loginStatus', false)
  }
}

export default {
  state, mutations, actions
}
