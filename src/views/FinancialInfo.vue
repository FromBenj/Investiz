<template>
  <div class="container">
    <h1 class="text-center">Financial Information</h1>
    <form id="app"
          @submit.prevent="handleSubmit"
          method="post"
          class="d-flex flex-column align-items-center ">
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="account-name">Account name: </label>
        <input id="account-name" v-model="accountName" type="text" placeholder="Livret A..." name="name" class="input">
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="initial-amount">Initial amount: </label>
        <span class="fw-bold">
          <input id="initial-amount" v-model="initialAmount" @input="amountStyle" type="text" placeholder="1 800..." name="initial" class="input">€
        </span>
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="rate">Rate: </label>
        <span class="fw-bold">
          <input id="rate" v-model="accountRate" type="text" placeholder="2%..." name="rate" class="input">%
        </span>
      </div>
      <button id="submission-button" class="btn my-5 py-2 px-4" type="submit">
        Done
      </button>
    </form>
  </div>
</template>

<script>
  import router from "@/router";

  export default {
    name: 'FinancialInfo',
    data() {
      return {
        accountName: '',
        initialAmount: '',
        accountRate: '',
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
            this.initialAmount = result;

          }
        }
      },
      handleSubmit() {
        router.push({path: 'forecasts'})
      }
    },
  }
</script>

<style scoped>
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
