<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <h1 class=" main-green text-center">Financial Information</h1>
      <drop-down-menu />
    </div>
    <h2 class="financial-info-main-title">New account</h2>
    <form id="app"
          class="mt-4 d-flex flex-column align-items-center "
          method="post"
          @submit.prevent="handleSubmit">
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="account-name">Account name: </label>
        <input id="account-name" v-model="accountName" class="input" name="accountName" placeholder="Livret A..."
               type="text">
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="initial-amount">Initial amount: </label>
        <span class="fw-bold">
          <input id="initial-amount" class="input" name="initialAmount" placeholder="1 800..."
                 type="text" @input="amountStyle">€
        </span>
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="rate">Rate: </label>
        <span class="fw-bold">
          <input id="rate" v-model="accountRate" class="input" name="accountRate" placeholder="2..." type="text">%
        </span>
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="monthly-savings">Monthly savings: </label>
        <span class="fw-bold">
          <input id="monthly-savings" class="input" name="monthlySavings" placeholder="300..."
                 type="text" @input="amountStyle">€
        </span>
      </div>
      <button id="submission-button" class="btn my-5 py-2 px-4">
        Done
      </button>
    </form>
  </div>
  <div>
    <h2 class="financial-info-main-title">All Accounts</h2>
    <div class="container">
      <div class="row">
        <div v-for="account in accounts" :key="account.id" class="col-6 col-lg-4">
          <financial-account :account="account"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import router from "@/router";
import {supabase} from "../../supabase.js";
import FinancialAccount from "@/components/financialAccount.vue";
import DropDownMenu from "@/components/dropDownMenu.vue";
import supabaseApi from "@/services/supabase-api";

export default {
  name: 'FinancialInfo',
  components: {DropDownMenu, FinancialAccount},
  data() {
    return {
      accountName: '',
      initialAmount: '',
      accountRate: '',
      monthlySavings: '',
      accounts: [],
    }
  },
  computed: {
    accountData() {
      return {
        name: this.accountName,
        amount: this.initialAmount,
        rate: this.accountRate,
        m_savings: this.monthlySavings
      }
    }
  },
  methods: {
    amountStyle(event) {
      const inputValue = event.target.value;
      let amount = "";
      inputValue.split('').forEach(char => {
        if (!isNaN(parseInt(char))) {
          amount += char;
        }
      })
      console.log(amount);
      this[event.target.name] = amount;
      console.log(this[event.target.name]);
      const amountFormatter = new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      event.target.value = amountFormatter.format(amount);
    },
    valuesTypeManagement() {
      this.initialAmount = parseInt(this.initialAmount.replace(/\s+/g, ''));
      this.accountRate = parseFloat(this.accountRate.replace(/\s+/g, ''));
      this.monthlySavings = parseInt(this.monthlySavings.replace(/\s+/g, ''));
    },
    async accountsManagement() {
      try {
        const data = this.accountData;
        const {error} = await supabase
            .from('account')
            .insert(data);
        if (error) {
          console.error('Error:', error);
          return null;
        }
        console.log('Row inserted:', data);
        await this.allAccounts();
        return data;
      } catch (error) {
        console.error('Unexpected error:', error);
        return null;
      }
    },
    async allAccounts() {
      this.accounts = await supabaseApi.getAllAccounts();
    },
    backToInitialData() {
      this.accountName = '';
      this.initialAmount = '';
      const initialAmountInput = document.getElementById('initial-amount');
      initialAmountInput.value = '';
      this.accountRate = '';
      this.monthlySavings = '';
      const monthlySavingsInput = document.getElementById('monthly-savings');
      monthlySavingsInput.value = '';
    },
    handleSubmit(event) {
      // if the form is valid
      this.valuesTypeManagement();
      this.accountsManagement();
      this.backToInitialData();
      //router.push({path: 'forecasts'})
      // if the form is not valid
      event.preventDefault();
    }
  },
    async mounted() {
      await this.allAccounts();
    }
}
</script>

<style scoped>
.financial-info-main-title {
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 1rem;
}

input {
  background-color: #eee;
  border: none;
  padding: 1rem;
  font-size: 1.3rem;
  width: 20rem;
  border-radius: 1rem;
  color: var(--main-blue);
  box-shadow: 0 0.4rem #dfd9d9;
  cursor: pointer;
  margin-right: 0.6rem;
}

input:focus {
  outline-color: var(--main-blue);
}

label {
  z-index: 2;
  margin-bottom: -0.6rem;
  object-fit: contain;
  background-color: var(--main-cream);
  width: fit-content;
  border-radius: 0 .8rem .8rem 0;
  padding: 0.5rem;
}

#submission-button {
  background-color: var(--main-blue);
  color: var(--main-cream);
}
</style>
