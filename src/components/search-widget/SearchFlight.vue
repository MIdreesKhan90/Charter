<script setup>
import SearchPlaceinput from "./SearchPlaceInput.vue";
import emitter from "tiny-emitter/instance";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import { ref } from "vue";
import { useSearchStore } from "@/stores/search";
import { useToast } from "vue-toastification";

const searchStore = useSearchStore();
const toast = useToast();
// Travelers
const togglePassangerCount = ref(false);

const range = ref({
  start: new Date(),
  end: new Date(),
});

const calendar = ref(null);

let toggleIcon = ref(false);

let timeoutVar;

emitter.on("reset", function () {
  searchStore.requestFlightParams.date = false; //new Date();
  searchStore.requestFlightParams.origin = "";
  searchStore.requestFlightParams.dest = "";
  searchStore.requestFlightParams.origin_details = {};
  searchStore.requestFlightParams.destination_details = {};
  searchStore.requestFlightParams.pax = 1;
});
emitter.emit("reset");

function exchangeOriDest() {
  toggleIcon.value = !toggleIcon.value;

  emitter.emit("exchangeInputField", {
    type: "origin",
    value: searchStore.requestFlightParams.origin,
  });
  emitter.emit("exchangeInputField", {
    type: "destination",
    value: searchStore.requestFlightParams.dest,
  });

  let temp = searchStore.requestFlightParams.origin;
  searchStore.requestFlightParams.origin = searchStore.requestFlightParams.dest;
  searchStore.requestFlightParams.dest = temp;

  let temp_d = searchStore.requestFlightParams.origin_details;
  searchStore.requestFlightParams.origin_details = searchStore.requestFlightParams.destination_details;
  searchStore.requestFlightParams.destination_details = temp_d;
}

emitter.on("updateInput", function (type, value) {
  if (type === "origin") {
    searchStore.requestFlightParams.origin = value.name;
    searchStore.requestFlightParams.origin_details = value.details;
  } else {
    searchStore.requestFlightParams.dest = value.name;
    searchStore.requestFlightParams.destination_details = value.details;
  }
});

function toggleCustomerInfo() {
  if (searchStore.isCustomerInfo) {
    searchStore.isCustomerInfo = false;
  } else {
    if (searchStore.requestFlightParams.origin == "") {
      emitter.emit("focuInput", { type: "origin" });
    } else if (searchStore.requestFlightParams.dest == "") {
      emitter.emit("focuInput", { type: "destination" });
    } else if (searchStore.requestFlightParams.origin == searchStore.requestFlightParams.dest) {
      //toast.error("Origin and Destination should be different.", {timeout: 3000});
      // add class "error"
      // TODO: show error on field
      emitter.emit("focuInput", { type: "destination" });
    } else if (!searchStore.requestFlightParams.date) {
      emitter.emit("focuInput", { type: "dateTimePicker" });
    } else if (searchStore.requestFlightParams.pax == 0) {
      document.getElementById("btn-travelers").click();
      if (!searchStore.travelerFocus) searchStore.travelerFocus = true;
    } else {
      searchStore.isCustomerInfo = true;
      if (!searchStore.travelerFocus) searchStore.travelerFocus = true;

      // track event
      if (typeof fbq == "function") fbq("track", "Search"); // Facebook
      if (typeof hj == "function") hj("event", "getaquote"); // HotJar
      if (typeof window.lintrk == "function") window.lintrk("track", { conversion_id: "11705802" }); // LinkedIn
      if (typeof gtag == "function")
        gtag("event", "success", {
          action_term: "getaquote",
          quote_term: searchStore.requestFlightParams.origin + " to " + searchStore.requestFlightParams.dest,
          is_mobile: "no",
          send_to: "G-XLCTXVRP9M/thankyou",
        }); // GA
    }
  }
}

emitter.on("focuInput", function (value) {
  if (value.type == "dateTimePicker") {
    setTimeout(function () {
      document.getElementById("datepicker").click();
    }, 200);
  } else if (value.type == "passengerCount") {
    togglePassangerCount.value = true;

    timeoutVar = setTimeout(function () {
      togglePassangerCount.value = false;
    }, 1500);
  }
});

emitter.on("dateRest", function () {
  setTimeout(function () {
    if (searchStore.tripType === "one-way") {
      searchStore.requestFlightParams.date = dateToYMD(new Date());
    } else {
      range.value = { start: new Date(), end: new Date() };
      searchStore.requestFlightParams.date = dateToYMD(new Date()) + " - " + dateToYMD(new Date());
    }
    document.getElementById("datepicker").placeholder = searchStore.requestFlightParams.date;
  }, 400);
});

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + (m <= 9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d) + "/" + y;
}

function onDayClick(e) {
  if (searchStore.tripType === "one-way") {
    emitter.emit("focuInput", { type: "passengerCount" });
    searchStore.requestFlightParams.date = dateToYMD(searchStore.requestFlightParams.date);
  } else {
    searchStore.requestFlightParams.date = dateToYMD(range.value.start) + " - " + dateToYMD(range.value.end);
  }
  document.getElementById("datepicker").placeholder = searchStore.requestFlightParams.date;
}

function changeCount(type) {
  if (type == "decrement") {
    if (searchStore.requestFlightParams.pax > 1)
      searchStore.requestFlightParams.pax = searchStore.requestFlightParams.pax - 1;
  } else {
    searchStore.requestFlightParams.pax = searchStore.requestFlightParams.pax + 1;
  }
}
</script>

<template>
  <div class="search-panel__main">
    <div
      class="search-field"
      :class="{
        error:
          searchStore.requestFlightParams.origin == searchStore.requestFlightParams.dest &&
          searchStore.requestFlightParams.origin != '',
      }"
    >
      <SearchPlaceinput type="origin" />
      <label class="field-label" for="origin">
        <i class="icon-flight-up"></i>
        Origin
      </label>
    </div>

    <div :class="{ swapped: toggleIcon }" class="field-swap">
      <button @click="exchangeOriDest()" :class="{ 'swap-rotated': toggleIcon }">
        <i class="icon-arrow-left-right"></i>
      </button>
    </div>

    <div
      class="search-field"
      :class="{
        error:
          searchStore.requestFlightParams.origin == searchStore.requestFlightParams.dest &&
          searchStore.requestFlightParams.dest != '',
      }"
    >
      <SearchPlaceinput type="destination" />
      <label class="field-label" for="destination">
        <i class="icon-flight-down"></i>
        Destination
      </label>
    </div>

    <DatePicker
      v-if="searchStore.tripType !== 'one-way'"
      is-range
      class="search-field single-input"
      v-model="range"
      :columns="1"
      :min-date="new Date()"
      @dayclick="onDayClick(event)"
      :is-required="true"
      ref="calendar"
    >
      <template #default="{ range, togglePopover, updateValue }">
        <input class="field-input" @click="togglePopover()" id="datepicker" readonly :value="range" />
        <label class="field-label-datepicker" for="datepicker">
          <i class="icon-calendar"></i>
          Departure - Return
        </label>
      </template>
    </DatePicker>

    <DatePicker
      v-if="searchStore.tripType === 'one-way'"
      class="search-field single-input"
      v-model="searchStore.requestFlightParams.date"
      :columns="1"
      :min-date="new Date()"
      @dayclick="onDayClick(event)"
      :is-required="true"
      ref="calendar"
    >
      <template #default="{ date, togglePopover }">
        <input class="field-input" @click="togglePopover()" id="datepicker" readonly :value="date" />
        <label class="field-label-datepicker" for="datepicker">
          <i class="icon-calendar"></i>
          Departure
        </label>
      </template>
    </DatePicker>

    <div
      @mouseleave="togglePassangerCount = false"
      class="search-field"
      :class="{
        error: searchStore.formErrors.pax && searchStore.requestFlightParams.pax == 0,
      }"
      @click="searchStore.travelerFocus = true"
    >
      <p class="form-error" v-if="searchStore.requestFlightParams.pax && searchStore.requestFlightParams.pax == 0">
        Date(s) is required
      </p>
      <div class="dropdown-block">
        <button id="btn-travelers" class="btn-dropdown" @click="togglePassangerCount = !togglePassangerCount">
          <template v-if="searchStore.travelerFocus">
            {{ searchStore.requestFlightParams.pax }}
            {{ searchStore.requestFlightParams.pax > 1 ? "Travelers" : "Traveler" }}
          </template>
        </button>
        <div v-bind:class="['dropdown', { active: togglePassangerCount }]" class="">
          <div class="counter">
            <button class="btn btn-counter" @click.stop.prevent="changeCount('decrement')">-</button>
            <div class="count">{{ searchStore.requestFlightParams.pax }}</div>
            <button class="btn btn-counter" @click.stop.prevent="changeCount('increment')">+</button>
          </div>
        </div>
      </div>
      <label class="field-label-traveler" :class="{ focused: searchStore.travelerFocus }" for="travelers">
        <i class="icon-travelers"></i>Travelers
      </label>
    </div>

    <div class="search-button toggle-search-button">
      <button class="btn btn-primary" @click="toggleCustomerInfo()" :class="{ change: searchStore.isCustomerInfo }">
        <span class="search-btn-quote"> Get A Quote <i class="icon-arrow-right-circle-white"></i> </span>
        <span class="search-btn-close"> Close <i class="icon-cross-circle"></i> </span>
      </button>
    </div>
  </div>
</template>
