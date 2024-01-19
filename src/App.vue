<script setup>
import { ref } from "vue";
import { useRoute, RouterView } from "vue-router";

const layout = ref("main");
const route = useRoute();
</script>

<template>
  <component :is="route.meta.layout || layout">
    <RouterView />
  </component>
</template>
