<script setup>
import SearchFlight from "@/components/search-widget/SearchFlight.vue";
import FlightDetailInfo from "@/components/search-widget/FlightDetailInfo.vue";
import emitter from "tiny-emitter/instance";
import { onMounted } from "vue";
import { useSearchStore } from "@/stores/search";
import { useCommonStore } from "@/stores/common";

const searchStore = useSearchStore();
const commonStore = useCommonStore();

function chageTripType(type) {
  searchStore.tripType = type;
  emitter.emit("dateRest");
}
function toggleMobileStickySearchWidgetState1() {
  searchStore.toggleMobileStickySearchWidgetState1 = !searchStore.toggleMobileStickySearchWidgetState1;

  // track event
  if(typeof(fbq)=='function') fbq("track", "Search"); // Facebook
  if(typeof(hj)=='function') hj("event", "getaquote"); // HotJar
  if(typeof(window.lintrk)=='function') window.lintrk('track',{'conversion_id':'11705802'}); // LinkedIn
  if(typeof(gtag)=='function') gtag("event", "success", {
      action_term: "getaquote",
      quote_term: searchStore.requestFlightParams.origin + " to " + searchStore.requestFlightParams.dest,
      is_mobile: "yes",
      send_to: "G-XLCTXVRP9M/thankyou",
    }); // GA
}

onMounted(() => {
  searchStore.getAirportsPreList();
  searchStore.getJetsPreList();
});
</script>

<template>
  <section
    class="section-search"
    :class="{
      'is-sticky': commonStore.isSearchWidgetSticky,
      'is-mobile-sticky-state-1': searchStore.toggleMobileStickySearchWidgetState1,
      'is-customer-info-state-3': searchStore.isCustomerInfo,
    }"
  >
    <div class="container">
      <div
        id="search-panel"
        class="search-panel"
      >
        <div class="search-panel__top">
          <div class="search-panel__type">
            <button
              type="button"
              :class="{
                'btn-primary': searchStore.tripType === 'one-way',
                'btn-dark-outline': searchStore.tripType !== 'one-way',
              }"
              class="btn btn-sm"
              @click="chageTripType('one-way')"
            >
              One way
            </button>
            <button
              type="button"
              :class="{
                'btn-primary': searchStore.tripType === 'round-trip',
                'btn-dark-outline': searchStore.tripType !== 'round-trip',
              }"
              class="btn btn-sm"
              @click="chageTripType('round-trip')"
            >
              Round trip
            </button>
          </div>

          <SearchFlight />
        </div>
        <button
          class="btn btn-main btn-primary toggle-btn-mob-state1"
          :class="{ hidden: searchStore.isCustomerInfo }"
          @click="toggleMobileStickySearchWidgetState1()"
        >
          <span class="true"> Get A Quote <i class="icon-arrow-right-circle-white"></i> </span>
          <span class="false"> Go Back </span>
        </button>
        <FlightDetailInfo v-if="searchStore.isCustomerInfo" />
      </div>
    </div>
  </section>
</template>
