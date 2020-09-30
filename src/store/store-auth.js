import Vue from 'vue'

import * as api from 'src/helpers/api-mock'
import { authService } from 'boot/auth'

const state = {
   authMachineState: 'anonymous',
   loggedIn: null,
   users: {},
}

const mutations = {
   LOGGED_IN: (state, value) => {
      state.loggedIn = value
   },

   SET_USERS: (state, value) => {
      state.users = value
   },

   ADD_USER: (state, value) => {
      Vue.set(state.users, value.id, value)
   },

   SET_AUTH_MACHINE_STATE: (state, value) => {
      state.authMachineState = value
   }
}

const getters = {
   authMachineState: (state) => {
      return state.authMachineState
   },

   loggedIn: (state) => {
      return state.loggedIn
   },

   users: (state) => {
      let userArray = []
      Object.keys(state.users).map(key => {
         userArray.push(state.users[key])
      })
      return userArray
   },
}

const actions = {
   clear: ({commit}) => {
      commit('SET_USERS', {})
   },

   load: ({ commit }) => {
      const dbUsers = api.getUsers()
      let stateUsers = {}
      dbUsers.map(u => {
         stateUsers[u.id] = u
      })
      commit('SET_USERS', stateUsers)
   },

   login: ({ commit, getters}, user) => {
      console.log('login')
      if (getters.loggedIn && getters.loggedIn.email === user.email) {
         console.log('login - skip')
         return false
      }

      const dbUsers = api.getUsers()
      console.log('login', 'dbUsers', dbUsers)
      let match = dbUsers.filter(u => u.email === user.email)
      if (match.length === 1) {
         const stateUser = {
            ...match[0],
            photoUrl: match[0].photoUrl ? match[0].photoUrl : user.picture
         }
         console.log('login', 'commit', stateUser)
         commit('LOGGED_IN', stateUser)
         return false
      }

      authService.send('REGISTER')
   },

   create: ({ commit }, obj) => {
      let result = api.addUser(obj)
      if (result) {
         commit('ADD_USER', obj)
         return true
      } else {
         return false
      }
   }
}

export default {
   namespaced: true,
   state,
   mutations,
   getters,
   actions,
}
