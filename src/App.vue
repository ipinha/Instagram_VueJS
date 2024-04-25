<script setup>
  import Nav from './components/Nav.vue';
  import { RouterView } from 'vue-router';
  import {onMounted} from "vue"
  import {useUserStore} from "@/stores/users"

  const userStore = useUserStore()

  onMounted( () => {
    userStore.getUser()
  })
</script>

<template>
  <main>
    <Nav />
    <RouterView />
  </main>
</template>

<style scoped>

</style>
