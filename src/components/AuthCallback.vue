<template></template>

<script>
import { authService, authState } from 'boot/auth'

export default {
   name: "AuthCallback",

   methods: {
      initSession() {
         if (authState === 'anonymous') {
            authService.send('CALLBACK')
         }
         this.$router.push({ name: 'home' })
      },
   },

   beforeMount() {
      this.initSession();
   },
};
</script>
