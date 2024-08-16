<template>
  <div class="container">
    <main-nav title="Profit forecasts" />
    <h2 class="overall-profits-title mb-5">Overall profits</h2>
    <overall-chart />
  </div>
</template>

<script setup>
import OverallChart from "@/components/OverallChart.vue";
import MainNav from "@/components/mainNav.vue";
</script>
<script>
export default {
  name: 'ProfitForecasts',
}
</script>

<style scoped>
  .overall-profits-title {
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 1rem;
  }
</style>
