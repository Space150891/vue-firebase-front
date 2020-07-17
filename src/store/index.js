import Vue from 'vue'
import Vuex from 'vuex'
import { getUserList } from '../user-service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersList: {},
    user: {
      id: ''
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const usersList = await getUserList()

        commit('setUsers', usersList)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setUserId(state, id) {
      state.user.id = id
    },
    setUsers(state, usersList) {
      state.usersList = { ...usersList }
    }
  },
  getters: {
    user: s => s.user,
    usersList: s => s.usersList,
  },
  modules: {
  }
})
