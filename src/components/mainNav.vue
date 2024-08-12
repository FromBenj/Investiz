<template>
  <nav id="main-nav" class="container">
    <div class="d-flex justify-content-between mx-5 mt-4">
      <div v-for='(name, rout) in navItems' :key='rout'>
        <router-link :to="rout">
          <h2>{{ name }}</h2>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'mainNav',
  props: {
    navItems: Object,
  }
}
</script>

<style scoped>
#main-nav {
  color: var(--main-blue);
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  opacity: 80%;
}
</style>
