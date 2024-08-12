<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  :root {
    --main-blue: #003a57;
    --main-cream: floralwhite;
  }
  body {
    background-color: var(--main-cream) !important;
  }
</style>
