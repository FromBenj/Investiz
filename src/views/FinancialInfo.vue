<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <h1 class=" main-green text-center">Financial Information</h1>
      <drop-down-menu />
    </div>
    <h2 class="financial-info-main-title">New account</h2>
    <form id="app"
          @submit.prevent="handleSubmit"
          method="post"
          class="mt-4 d-flex flex-column align-items-center ">
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="account-name">Account name: </label>
        <input id="account-name" v-model="accountName" type="text" placeholder="Livret A..." name="accountName" class="input">
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="initial-amount">Initial amount: </label>
        <span class="fw-bold">
          <input id="initial-amount" v-model="initialAmount" @input="amountStyle" type="text" placeholder="1 800..." name="initialAmount" class="input">€
        </span>
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="rate">Rate: </label>
        <span class="fw-bold">
          <input id="rate" v-model="accountRate" type="text" placeholder="2..." name="accountRate" class="input">%
        </span>
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="monthly-savings">Monthly savings: </label>
        <span class="fw-bold">
          <input id="monthly-savings" v-model="monthlySavings" @input="amountStyle" type="text" placeholder="300..." name="monthlySavings" class="input">€
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
        <div class="col-6 col-lg-4" v-for="account in accounts" :key="account.id">
          <financial-account :account="account" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import router from "@/router";
  import { supabase } from "../../supabase.js";
  import FinancialAccount from "@/components/financialAccount.vue";
  import DropDownMenu from "@/components/dropDownMenu.vue";

  export default {
    name: 'FinancialInfo',
    components: { DropDownMenu, FinancialAccount },
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
        const amount = event.target.value
        const numberCheck = amount.split(" ").join("");
        if (isNaN(numberCheck)) {
          // send an error message
          alert("Please enter a valid number in the initial amount field.");
        } else {
          let result = numberCheck;
          const amountSplit = amount.split("");
          if (amountSplit.length > 3) {
            const resultArray = [];
            const modulo = amountSplit.length % 3;
            for (let i = 0; i < modulo; i++) {
              resultArray.push(amountSplit[i]);
            }
            resultArray.push(" ");
            let spaceIndex = 0;
            for (let i = modulo; i < amountSplit.length; i++) {
              spaceIndex++;
              if (spaceIndex % 3 === 0) {
                resultArray.push(amountSplit[i]);
                resultArray.push(" ");
              } else {
                resultArray.push(amountSplit[i]);
              }
            }
            result = resultArray.join("").trim();
            this[event.target.name] = result;
          }
        }
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
          return data;
        } catch (error) {
          console.error('Unexpected error:', error);
          return null;
        }
      },
      async allAccounts() {
        try {
          const { data, error } = await supabase
              .from('account')
              .select('*');
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            this.accounts = data;
            console.log(data);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      },
      backToInitialData() {
        this.accountName = '';
        this.initialAmount = '';
        this.accountRate = '';
        this.monthlySavings = '';
      },
      handleSubmit(event) {
        // if the form is valid
        this.valuesTypeManagement();
        this.accountsManagement();
        this.backToInitialData();
        //router.push({path: 'forecasts'})
        // if the form is not valid
        event. preventDefault()
      }
    },
    mounted() {
      this.allAccounts();
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
