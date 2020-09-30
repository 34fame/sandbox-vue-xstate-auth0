<template>
   <q-page class="flex flex-center">
      <q-form class="q-gutter-sm" @submit="handleRegister()" style="min-width: 320px; max-width: 80%;">
         <q-input label="Name" v-model="formData.name" />
         <q-input label="Email" v-model="formData.email" />
         <q-input label="Mobile" v-model="formData.mobile" />
         <q-input label="Photo (URL)" v-model="formData.photoUrl" />

         <div class="q-mt-md row q-gutter-md">
            <q-btn label="Cancel" no-caps @click="handleCancel()" />
            <q-btn color="primary" label="Register" no-caps type="submit" />
         </div>
      </q-form>
   </q-page>
</template>

<script>
import { SessionStorage as ss } from 'quasar'
import { mapActions } from 'vuex'

import { authService } from 'boot/auth'

export default {
   name: "Register",

   data() {
      return {
         formData: {
            name: '',
            email: '',
            mobile: '',
            photoUrl: '',
         }
      }
   },

   methods: {
      ...mapActions(['auth/create']),

      initData() {
         let sessionUser = ss.getItem('user')
         this.formData = {
            ...this.formData,
            name: sessionUser.name,
            email: sessionUser.email,
            photoUrl: sessionUser.picture
         }
      },

      handleCancel() {
         authService.send('CANCEL')
      },

      async handleRegister() {
         let result = await this['auth/create'](this.formData)
         console.log('handleRegister', 'result', result)
         if (result) {
            authService.send('DONE')
         } else {
            authService.send('ERROR')
         }
         this.$router.push({ name: 'home' })
      }
   },

   beforeMount() {
      this.initData()
   }
}
</script>

<style scoped>

</style>
