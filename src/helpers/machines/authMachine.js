import { SessionStorage as ss } from 'quasar'
import { Machine, actions, assign, send } from 'xstate'
import { inspect } from '@xstate/inspect'

const { log } = actions
import { router } from 'src/router'
import { store } from 'src/store'
import * as api from 'src/helpers/api-mock'
import * as auth from 'src/helpers/auth'

inspect({ iframe: false })

export const authMachine = Machine(
   {
      id: 'auth',

      context: {
         user: {},
         idToken: null,
         accessToken: null,
      },

      initial: 'anonymous',

      states: {
         anonymous: {
            entry: log('anonymous - entry'),
            always: [
               {
                  target: 'loadProfile',
                  cond: 'hasPersistedTokens',
               },
            ],
            on: {
               LOGIN: {
                  target: 'loggingIn',
               },

               CALLBACK: 'loggedIn',
            },
         },

         loggingIn: {
            invoke: {
               id: 'execLogin',
               src: 'execLogin',
               onDone: 'loggedIn',
               onError: 'loginError',
            },
         },

         loggedIn: {
            always: 'loadTokens',
         },

         loadTokens: {
            invoke: {
               id: 'loadTokens',
               src: 'loadTokens',
            },

            always: [
               {
                  target: 'loadProfile',
                  cond: 'hasPersistedTokens',
                  actions: assign({
                     accessToken: ss.getItem('access_token'),
                     idToken: ss.getItem('id_token'),
                     user: {},
                  }),
               },
            ],

            after: {
               1000: 'loadTokens',
            },
         },

         loadProfile: {
            invoke: {
               id: 'loadProfile',
               src: 'loadProfile',
            },

            always: [
               {
                  target: 'verifying',
                  cond: 'hasPersistedProfile',
                  actions: assign({
                     accessToken: ss.getItem('access_token'),
                     idToken: ss.getItem('id_token'),
                     user: ss.getItem('user'),
                  }),
               },
            ],

            after: {
               1000: 'loadProfile',
            },
         },

         verifying: {
            entry: log('verifying - entry'),
            always: [
               {
                  target: 'authenticated',
                  cond: 'userExists'
               },
               {
                  target: 'registering'
               }
            ],
         },

         registering: {
            entry: [
               log('registering - entry'),
               'register',
            ],

            on: {
               CANCEL: 'loggingOut',
               DONE: 'authenticated',
               ERROR: 'registerError',
            },
         },

         authenticated: {
            on: {
               LOGOUT: 'loggingOut',
            },
            exit: log('authenticated - exit'),
         },

         loggingOut: {
            entry: log('loggingOut - entry'),

            invoke: {
               id: 'execLogout',
               src: 'execLogout',
               onDone: 'cleaning',
               onError: 'loginError',
            },

            exit: log('loggingOut - exit'),
         },

         cleaning: {
            entry: log('cleaning - entry'),
            always: {
               target: 'anonymous',
               actions: assign({ accessToken: null, idToken: null, user: {} }),
            },

            exit: log('cleaning - exit'),
         },

         loginError: {
            entry: log('loginError - entry'),
         },

         loadError: {
            entry: log('loadError - entry'),
         },

         registerError: {
            entry: log('registerError - entry'),
         },

      },
   },

   {
      actions: {
         logError: (context, event) => {
            console.error('authMachine', context, event)
         },
      },

      guards: {
         hasPersistedTokens: () => {
            return !!(ss.getItem('id_token') && ss.getItem('access_token'))
         },

         hasPersistedProfile: () => {
            return !!ss.getItem('user')
         },

         userExists: (context) => {
            const dbUsers = api.getUsers()
            const match = dbUsers.filter(u => u.email === context.user.email)
            return !!match.length;
         },
      },

      services: {
         execLogin: () => auth.login(),

         execLogout: () => {
            ss.clear()
            auth.logout()
         },

         loadTokens: () => {
            auth.authSvc.parseHash({ hash: window.location.hash }, function(err, authResult) {
               if (!err) {
                  ss.set('access_token', authResult.accessToken)
                  ss.set('id_token', authResult.idToken)
               }
            })
         },

         loadProfile: () => {
            const accessToken = ss.getItem('access_token')
            auth.authSvc.client.userInfo(accessToken, async (err, user) => {
               if (!err) {
                  ss.set('user', user)
               }
            })
         },

      },
   },
)
