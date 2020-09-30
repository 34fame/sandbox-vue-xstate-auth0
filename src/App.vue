<template>
   <div id="q-app">
      <template v-if="!loading">
         <router-view/>
      </template>

      <template v-else></template>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Loading, SessionStorage as ss } from 'quasar'

export default {
   name: 'App',

   data() {
      return {
         loading: false
      }
   },

   computed: {
      ...mapGetters(['auth/loggedIn', 'auth/users', 'auth/authMachineState']),

      authMachineState() {
         return this['auth/authMachineState']
      },
   },

   methods: {
      ...mapActions(['auth/clear', 'auth/load', 'auth/login']),

      initData() {
         if (!this['auth/loggedIn'] && ss.getItem('access_token')) this['auth/login'](ss.getItem('user'))

         if (!this['auth/users'].length) this['auth/load']()

         if (!!this['auth/loggedIn']) {
            this['auth/clear']()
         }
      },

   },

   watch: {
      'authMachineState': function(value) {
         console.log('App', 'authMachineState', value)
         switch (value) {
            case 'registering':
               this.$router.push({ name: 'register' })
               this.loading = false
               break
            case 'authenticated':
               this.initData()
               this.loading = false
               break
            case 'anonymous':
               this.loading = false
               break
            default:
               this.loading = true
         }
      },

      loading: function(value) {
         if (value) {
            Loading.show()
         } else {
            Loading.hide()
         }
      }
   },

   beforeMount() {
      this.initData()
   },
}
</script>
