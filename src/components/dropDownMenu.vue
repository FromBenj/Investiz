<template>
  <div class="position-relative">
    <div id="drop-menu-icon-container" @click="menuDisplay">
      <BIconThreeDots id="drop-menu-icon"/>
    </div>
    <div id="dropdown-content">
      <router-link :to="HomePage">Home</router-link>
      <router-link :to="FinancialInfo">Financial&nbsp;information</router-link>
      <router-link :to="ProfitForecasts">Profit forecasts</router-link>
    </div>
  </div>
</template>

<script>
import { BIconThreeDots } from 'bootstrap-icons-vue';
import ProfitForecasts from "@/views/ProfitForecasts.vue";
import FinancialInfo from "@/views/FinancialInfo.vue";
import HomePage from "@/views/HomePage.vue";

export default {
  name: "dropDownMenu",
  computed: {
    HomePage() {
      return HomePage
    },
    FinancialInfo() {
      return FinancialInfo
    },
    ProfitForecasts() {
      return ProfitForecasts
    }
  },
  components: {
    BIconThreeDots,
  },
  methods: {
    menuDisplay() {
      const menu = document.getElementById('dropdown-content');
      menu.style.display = 'flex';
      menu.addEventListener("mouseleave", () => {
        menu.style.display = 'none';
      });
      const menuLinks = document.querySelectorAll('a');
      for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("mouseover", () => {
          menuLinks[i].style.backgroundColor = "var(--main-green)";
          menuLinks[i].style.color = "white";
          menuLinks[i].addEventListener('mouseleave', () => {
            menuLinks[i].style.backgroundColor = "initial";
            menuLinks[i].style.color = "initial";
          })
        });
      }
    }
  }
}
</script>

<style scoped>
#drop-menu-icon {
  transform: scale(1.6);
}
#drop-menu-icon-container {
  cursor: pointer;
  padding: 7px 14px;
  border-radius: 10px;
  border: 2px solid var(--main-blue);
}
#dropdown-content {
  display: none;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
  padding: 15px 22px;
  border-radius: 0 10px 10px 10px;
  background-color: var(--main-cream-low-opacity);
}

a {
  color: var(--main-green);
  text-decoration: none;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}

</style>
