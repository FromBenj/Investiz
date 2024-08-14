<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <h1 class="main-green text-center">Profit Forecasts</h1>
      <drop-down-menu />
    </div>
    <overall-chart />
  </div>
</template>

<script>
  import DropDownMenu from "@/components/dropDownMenu.vue";
  import OverallChart from "@/components/OverallChart.vue";

  export default {
    name: 'ProfitForecasts',
    components: {DropDownMenu, OverallChart},
  }
</script>
