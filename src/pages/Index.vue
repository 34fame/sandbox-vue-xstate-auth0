<template>
   <q-page class="flex flex-center">
      <template v-if="loggedIn">
         <q-card class="q-pa-xl">
            <div class="column items-center q-gutter-sm">
               <q-avatar size="128px">
                  <q-img
                     :src="loggedIn.photoUrl"
                  />
               </q-avatar>
               <div class="text-subtitle2">{{ loggedIn.name }}</div>
               <div class="text-caption">{{ loggedIn.email }}</div>
            </div>
         </q-card>
      </template>

      <template v-else>
         <div class="column items-center q-gutter-md">
            <img
               alt="Quasar logo"
               src="~assets/quasar-logo-full.svg"
            >
            <div class="text-caption">You'll need to login to continue...</div>
         </div>

      </template>

   </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SessionStorage as ss } from 'quasar'
import { authContext, authState, authService } from 'boot/auth'

export default {
   name: 'PageIndex',

   computed: {
      ...mapGetters(['auth/loggedIn']),

      loggedIn() {
         return this['auth/loggedIn']
      },

      authState() {
         return authState
      },
   },

   methods: {
      ...mapActions(['auth/login']),
   },

   mounted() {
      if (ss.getItem('access_token') && !this['auth/loggedIn']) {
         this['auth/login'](ss.getItem('user'))
      }
   },
}
</script>
