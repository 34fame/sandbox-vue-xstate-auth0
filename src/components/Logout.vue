<template>
   <q-page class="flex flex-center">
      <div class="column q-gutter-md">
         <img
            alt="Quasar logo"
            src="~assets/quasar-logo-full.svg"
         >
         <div class="text-caption">To complete the logout process, please close your browser.</div>
         <div class="q-mt-lg row justify-center">
            <q-btn label="Return" no-caps :to="{ name: 'home' }" />
         </div>
      </div>
   </q-page>
</template>

<script>
export default {
name: "Logout"
}
</script>

<style scoped>

</style>
