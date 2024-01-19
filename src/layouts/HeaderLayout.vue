<script setup>
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useCommonStore } from "@/stores/common";
import { useSearchStore } from "@/stores/search";
import { useRoute, RouterView } from "vue-router";

const props = defineProps({
  fixed: Boolean,
});

const commonStore = useCommonStore();
const searchStore = useSearchStore();
const isFixed = ref(false);
const route = useRoute();

function handleScroll() {
  commonStore.isToggleMenu = false;

  // let cWidth = document.documentElement.clientWidth;
  // if (cWidth > 767) {
  //   searchStore.isCustomerInfo = false;
  // }

  let header = document.querySelector("#header");
  if (window.scrollY > 60 && !header.className.includes("is-fixed")) {
    isFixed.value = true;
  } else if (window.scrollY < 60) {
    isFixed.value = false;
  }

  if (window.scrollY > document.documentElement.clientHeight) {
    commonStore.isSearchWidgetSticky = true;

  } else if (window.scrollY < document.documentElement.clientHeight) {
    if (route.name == "home") {
      commonStore.isSearchWidgetSticky = false;
    }
  }
}

// track events
function fire_event(which) {
  // fire the Phone Call event
  if (which == "phone") {
    if(typeof(fbq)=='function') fbq("track", "Contact"); // Facebook
    if(typeof(hj)=='function') hj("event", "phone_header"); // HotJar
    if(typeof(window.lintrk)=='function') window.lintrk('track', { conversion_id: 11705770 }); // LinkedIn
    if(typeof(gtag)=='function') gtag("event", "success", {
        action_term: "phone_header",
        send_to: "G-XLCTXVRP9M/thankyou",
      }); // GA

    // fire the WhatsApp Chat event
  } else if (which == "wa") {
    if(typeof(fbq)=='function') fbq("track", "Contact"); // Facebook
    if(typeof(hj)=='function') hj("event", "whatsapp_header"); // HotJar
    if(typeof(window.lintrk)=='function') window.lintrk('track', { conversion_id: 11705762 }); // LinkedIn
    if(typeof(gtag)=='function') gtag("event", "success", {
        action_term: "whatsapp_header",
        send_to: "G-XLCTXVRP9M/thankyou",
      }); // GA
  }
}

onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    id="header"
    :class="{
      'is-always-fixed': fixed,
      'is-fixed': isFixed,
    }"
    class="header"
  >
    <div class="container">
      <div class="header-panel">
        <button @click="commonStore.isToggleMenu = !commonStore.isToggleMenu" class="header-menu-toggle">
          <span class="icon-menu"></span>
        </button>
        <nav class="header-nav" :class="{ show: commonStore.isToggleMenu }">
          <RouterLink to="/our-story" class="header-nav__item">Our Story</RouterLink>
          <RouterLink to="/our-services" class="header-nav__item">Our Services</RouterLink>
          <RouterLink to="/news" class="header-nav__item">News</RouterLink>
          <RouterLink to="/blog" class="header-nav__item">Blog</RouterLink>
        </nav>
        <div class="header-logo">
          <RouterLink class="main-logo" to="/">
            <img
              class="normal-logo"
              :src="commonStore.publicImage('/logo-impjets-white.svg')"
              alt="Logo"
              loading="lazy"
            />
            <img
              class="sticky-logo"
              :src="commonStore.publicImage('/logo-impjets-blue.svg')"
              alt="Logo"
              loading="lazy"
            />
          </RouterLink>
        </div>
        <div class="header-support">
          <a
            class="header-support__whatsapp"
            href="https://wa.me/14344436040"
            target="_blank"
            @click="fire_event('wa')"
          >
            <i class="icon-whatsapp"></i>
            <div class="header-support__whatsapp-label">Chat with us</div>
          </a>
          <a class="header-support__phone" href="tel:+18443325701" target="_blank" @click="fire_event('phone')">
            +1. 844.332.5701
          </a>
          <a href="tel:+18443325701" target="_blank" @click="fire_event('phone')">
            <i class="header-support__phone-icon icon-phone-black"></i>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
