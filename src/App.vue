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
    --main-cream-low-opacity: rgba(255, 250, 240, 0.9) ;
    --main-green: #118570;
  }
  body {
    background-color: var(--main-cream) !important;
  }
  .main-blue{
    color: var(--main-blue);
  }
  .main-cream {
    color: var(--main-cream);
  }
  .main-green {
    color: var(--main-green);
  }
</style>
