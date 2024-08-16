<template>
  <Bar
      v-if="loaded"
      id="overall-chart"
      :data="chartData"
      :options="chartOptions"
  />
</template>

<script>
import {Bar} from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
import profits from "@/utils/profits.js";
import supabaseApi from "@/services/supabase-api";
import initialAmount from "@/utils/initial-amount.js";
import savings from "@/utils/savings.js";

Chart.register(...registerables);

export default {
  name: 'BarChart',
  components: {Bar},
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [
          '1 year',
          '2 years',
          '3 years',
          '4 years',
          '5 years',
          '6 years',
          '7 years',
          '8 years',
          '9 years',
          '10 years',
        ],
        datasets: [
          {
            data: [],
            backgroundColor: '#003a57',
            label: 'Initial capital',
          },
          {
            data: [],
            backgroundColor: '#118570',
            label: 'Savings',
          },
          {
            data: [],
            backgroundColor: '#00d1b2',
            label: 'Profits per Year',
          }],
      },
      chartOptions: {
        animationEnabled: true,
        responsive: true,
        scales: {
          y: {
            stacked: true,
            ticks: {
              callback: function (value) {
                return value + ' €';
              }
            }
          },
          x: {
            stacked: true
          }
        }
      }
    }
  },
  methods: {
    async getInitialCapital() {
      const accounts = await supabaseApi.getAllAccounts();
      const initialCapital = initialAmount.getInitialAmount(accounts);
      let initialCapitalData = [];
      for (let i = 0; i < 10; i++) {
        initialCapitalData.push(initialCapital);
      }

      this.chartData.datasets[0].data = initialCapitalData;
    },
    async getAllSavings() {
      const accounts = await supabaseApi.getAllAccounts();
      this.chartData.datasets[1].data = savings.getSavings(accounts, 10);
    },
    async getAllProfits() {
      const allAccounts = await supabaseApi.getAllAccounts();
      let allProfits = [];
      for (let i = 0; i < 10; i++) {
        let allProfitsPerYear = 0;
        for (let j = 0; j < allAccounts.length; j++) {
          let account = allAccounts[j];
          let profit = profits.getProfits(account, i + 1);
          allProfitsPerYear += profit;
        }
        allProfits.push(allProfitsPerYear);
      }
      this.chartData.datasets[2].data = allProfits;
      this.loaded = true;
    }
  },
  mounted() {
    this.getInitialCapital();
    this.getAllSavings();
    this.getAllProfits();
  }
}
</script>
