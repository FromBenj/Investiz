<template>
  <div v-bind:id="`account-card-${account.id}`" class="account-card-container">
    <div class="d-flex justify-content-between align-content-center">
      <div class="account-rate">{{ account.rate }}%</div>
      <div class="trash" @click="deleteAccount(account.id)">
        <BIconTrash />
      </div>
    </div>
    <h3 class="text-center mb-3">{{ account.name }}</h3>
    <div class="money-container">
      <p class="mb-1">Initial amount: {{ account.amount }}&nbsp;€</p>
      <p class="mb-1">Monthly savings: {{ account.m_savings }}&nbsp;€</p>
    </div>
  </div>

</template>

<script>
import { supabase } from "../../supabase.js";
import { BIconTrash } from 'bootstrap-icons-vue';
export default {
  name: 'financialAccount',
  components: {
    BIconTrash,
  },
  props: {
    account: {
      type: Object,
      validator(account) {
        return typeof account === 'object' &&
            typeof account.name === 'number' &&
            typeof account.amount === 'number' &&
            typeof account.rate === 'number' &&
            typeof account.m_savings === 'number';
      }
    }
  },
    methods: {
    async deleteAccount(accountId) {
      try {
        const { error } = await supabase.from('account')
            .delete()
            .match({ id: accountId });
        if (error) {
          console.error('Error deleting row:', error);
        } else {
          console.log('Row deleted:', accountId);
          const accountCard = document.getElementById(`account-card-${accountId}`);
          const accountCardParent = accountCard.parentNode;
          accountCardParent.remove();
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  }
}
</script>

<style scoped>
  .account-card-container {
    background-color: var(--main-blue);
    color: var(--main-cream);
    border: 1px solid white;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .account-rate {
    background-color: var(--main-green);

    border-radius: 10px;
    padding: 10px;
    margin-bottom: 0.50rem;
    display: inline-block;
    border: 1px solid var(--main-cream);
  }
  .money-container {
    background-color: white;
    color: #003A57;
    border: 3px solid #118570;
    border-radius: 0 0 10px 10px;
    padding: 10px;
  }
  .trash {
    cursor: pointer;
    display: inline-block;
  }

</style>
