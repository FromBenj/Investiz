<template>
  <div class="container">
    <h1 class="text-center">Financial Information</h1>
    <form id="app"
      @submit.prevent="handleSubmit"
      method="post"
      class="d-flex flex-column align-items-center ">
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="account-name">Account name: </label>
        <input id="account-name" type="text" placeholder="Livret A..." name="name" class="input">
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="initial-amount">Initial amount: </label>
        <span class="fw-bold">
          <input id="initial-amount" type="text" placeholder="1 800..." name="initial" class="input">€
        </span>
      </div>
      <div class="d-flex flex-column mb-4">
        <label class="fw-bold" for="rate">Rate: </label>
        <span class="fw-bold">
          <input id="rate" type="text" placeholder="2%..." name="rate" class="input">%
        </span>
      </div>
      <button id="submission-button" class="btn my-5 py-2 px-4" type="submit">
        Done
      </button>
    </form>
  </div>
</template>

<script>
  import forecasts from "@/views/Forecasts.vue";
  import router from "@/router";

  export default {
    name: 'FinancialInfo',
    methods: {
      amountStyle(amount) {
        const numberCheck = amount.split(" ").join("");
        if (!isNaN(numberCheck)) {
          // send an error message
        } else {
          let result = amount;
          const amountSplit = amount.split("");
          if (amountSplit.length > 3) {
            const numbers = amountSplit.length;
            const numberModulo = numbers % 3;
            for (let i = numberModulo; i > 0; i--) {
              result += amountSplit[numbers - 1];
            }
            for (let i = numbers - numberModulo; i < amountSplit.length; i++) {
            }
          }
        }

        return result;
      },
      handleSubmit() {
        router.push({path: 'forecasts'})
      }
    },
    mounted() {
      const initialAmount = document.getElementById('initial-amount');
      initialAmount.addEventListener("input", (event) => {
        this.amountStyle(event.target.value);
      })
    }
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
