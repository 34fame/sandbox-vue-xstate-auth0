<template>
   <q-layout view="hHh Lpr lFf">
      <q-header elevated>
         <q-toolbar>
            <q-toolbar-title>
               Quasar XState Sandbox
            </q-toolbar-title>

            <q-btn v-if="!isLoggedIn" label="Login" @click="handleLogin()" />
            <q-btn v-if="isLoggedIn" label="Logout" @click="handleLogout()" />

         </q-toolbar>
      </q-header>

      <q-drawer
         bordered
         content-class="bg-grey-1"
      >
         <q-list>
         </q-list>
      </q-drawer>

      <q-page-container>
         <router-view/>
      </q-page-container>
   </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { authService } from 'boot/auth'

export default {
   name: 'MainLayout',

   computed: {
      ...mapGetters(['auth/loggedIn']),

      isLoggedIn() {
         return !!this['auth/loggedIn']
      }
   },

   methods: {
      async handleLogin() {
         authService.send('LOGIN')
      },

      async handleLogout() {
         authService.send('LOGOUT')
      },
   },
}
</script>
