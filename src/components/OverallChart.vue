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
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import profitByAccount from "@/utils/profit-by-account.js";
import supabaseApi from "@/services/supabase-api";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
          '11 years',
          '12 years',
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
    async getAllProfits() {
      const allAccounts = await supabaseApi.getAllAccounts();
      let allProfits = [];
      for (let i = 0; i < 12; i++) {
        let allProfitsPerYear = 0;
        for (let j = 0; j < allAccounts.length; j++) {
          let account = allAccounts[j];
          let profit = profitByAccount.getProfits(account, i + 1);
          allProfitsPerYear += profit;
        }
        allProfits.push(allProfitsPerYear);
      }
      this.chartData.datasets[1].data = allProfits;
      this.loaded = true;
    },
    async getInitialCapital() {
      const accounts = await supabaseApi.getAllAccounts();
      let initialCapital = 0;
      let initialCapitalData = [];
      for (let i = 0; i < accounts.length; i++) {
        initialCapital += accounts[i].amount;
      }
      for (let i = 0; i < 12; i++) {
        initialCapitalData.push(initialCapital);
      }

      this.chartData.datasets[0].data = initialCapitalData;
    }
  },
  created() {
    this.getInitialCapital()
    this.getAllProfits();
  }
}
</script>
