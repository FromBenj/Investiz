import { createRouter, createWebHistory } from 'vue-router'
import FinancialInfo from "@/views/FinancialInfo.vue";
import ProfitForecasts from "@/views/ProfitForecasts.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/financialInfo',
        name: 'FinancialInfo',
        component: FinancialInfo
    },
    {
        path: '/forecasts',
        name: 'ProfitForecasts',
        component: ProfitForecasts
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
