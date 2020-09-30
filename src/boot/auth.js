import { interpret } from 'xstate'

import { store } from 'src/store'
import { authMachine } from 'src/helpers/machines/authMachine'


const authService = interpret(authMachine, { devTools: true })
   .onTransition(state => {
      console.log('onTransition-bottom', state.value)
      try {
         store.commit('auth/SET_AUTH_MACHINE_STATE', state.value)
      } catch (e) {

      }
   })
   .start()

const authState = authService.state.value
const authContext = authService.state.context

export { authService, authMachine, authState, authContext }
