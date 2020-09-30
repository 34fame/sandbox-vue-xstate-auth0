import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store-auth'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    auth,
  },

  strict: process.env.DEV
})

export default function () {
  return Store
}

export const store = Store
