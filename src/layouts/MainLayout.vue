<script setup>
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import SupportSection from "@/components/sections/SupportSection.vue";
import Search from "@/components/search-widget/Search.vue";
</script>

<template>
  <HeaderLayout />
  <Search />
  <main>
    <slot />
    <SupportSection />
  </main>
  <FooterLayout />
</template>
