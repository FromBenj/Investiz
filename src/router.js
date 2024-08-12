import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/HomePage.vue";
import FinancialInfo from "@/views/FinancialInfo.vue";
import Forecasts from "@/views/ProfitForecasts.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/financialInfo',
        name: 'FinancialInfo',
        component: FinancialInfo
    },
    {
        path: '/forecasts',
        name: 'Forecasts',
        component: Forecasts
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
