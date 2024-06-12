<script setup>
    import Nav from './components/Nav.vue';
</script>
<template >
  <main style="background-color:#eef4e6;">
    <Nav />

    <RouterView/>
 
  </main>
</template>

<style scoped>
main{
  background-color:#eef4e6;
  min-height: 120vh;
}
</style>

