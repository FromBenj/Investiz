<template>
  <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
    <router-link :to="{name: 'HomePage'}">
      <BIconBrightnessLowFill id="nav-home-link-icon"></BIconBrightnessLowFill>
    </router-link>
    <h1 class="main-green text-center">{{ title }}</h1>
    <drop-down-menu />
  </div>
</template>


<script>

import DropDownMenu from "@/components/dropDownMenu.vue";
import {BIconBrightnessLowFill} from "bootstrap-icons-vue";

export default {
  name: 'mainNav',
  props: {
    title: String,
  },
  components: {
    DropDownMenu,
    BIconBrightnessLowFill
  },
}
</script>

<style scoped>
#nav-home-link-icon{
  transform: scale(4);
  color: var(--main-blue);
}
</style>
