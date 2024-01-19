<script setup>
import { ref, onMounted } from "vue";
import { useSearchStore } from "@/stores/search";
import { useRouter } from "vue-router";

const router = useRouter();
const searchStore = useSearchStore();

const timesArray = ref([]);
const aircraftsArray = ref(["Turbo", "Light", "Mid-size", "Heavy"]);
const departureTime = ref(0);
const arrivalTime = ref(0);

function initTimeArray() {
  let times = [],
    tt = 0,
    x = 60,
    ap = [" AM", " PM"];

  for (let i = 0; tt < 24 * 60; i++) {
    let hh = Math.floor(tt / 60);
    let mm = tt % 60;
    let hour = hh % 12;
    times[i] = ("0" + (hour == 0 ? 12 : hour)).slice(-2) + ":" + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)];
    tt = tt + x;
  }
  return times;
}

function onTimeChange(type, index) {
  let timeDiff = searchStore.getHourDiference();
  if (searchStore.requestFlightParams.aircraft !== 0 && searchStore.tripType == "one-way") {
    searchStore.getFlightTimeByType();
    if (type == "dt") {
      let t = index + searchStore.flightTime + timeDiff;
      if (t > 23) {
        t = t - 24;
      }
      arrivalTime.value = t;
    } else {
      let t = index - searchStore.flightTime + timeDiff;
      if (t < 0) {
        t = 24 + t;
      }
      departureTime.value = t;
    }
  }
  searchStore.requestFlightParams.dt = timesArray.value[departureTime.value];
  searchStore.requestFlightParams.at = timesArray.value[arrivalTime.value];
}

function reqFlightCB(){
  router.push("/thankyou");
}

onMounted(() => {
  timesArray.value = initTimeArray();
});
</script>

<template>
  <div class="search-panel__flight-detail">
    <div
      class="search-field select-unit"
      :class="{
        error: searchStore.formErrors.aircraft && searchStore.requestFlightParams.aircraft == '0',
      }"
    >
      <p class="form-error" v-if="searchStore.formErrors.aircraft && searchStore.requestFlightParams.aircraft == '0'">
        {{ searchStore.formErrors.aircraft }}
      </p>
      <select
        name=""
        id="field-aircraft"
        required=""
        @change="onTimeChange('dt', departureTime)"
        v-model="searchStore.requestFlightParams.aircraft"
      >
        <option value="0" disabled>Select preferred aircraft type/size</option>
        <option :value="index + 1" v-for="(aircraft, index) in aircraftsArray" :key="index">
          {{ aircraft }}
        </option>
      </select>
      <label class="field-label" for="field-aircraft"> Aircraft Type </label>
    </div>

    <div class="search-field select-unit">
      <select
        name=""
        id="field-departing-time"
        required=""
        @change="onTimeChange('dt', departureTime)"
        v-model="departureTime"
      >
        <option value="" disabled="" selected="" hidden=""></option>
        <option :value="i" v-for="(item, i) in timesArray" :key="i">
          {{ item }}
        </option>
      </select>
      <label class="field-label" for="field-departing-time"> Departing time </label>
    </div>

    <div class="search-field select-unit">
      <select
        name=""
        id="field-arriving-time"
        required=""
        @change="onTimeChange('at', arrivalTime)"
        v-model="arrivalTime"
      >
        <option value="" disabled="" selected="" hidden=""></option>
        <option :value="i" v-for="(item, i) in timesArray" :key="i">
          {{ item }}
        </option>
      </select>
      <label class="field-label" for="field-arriving-time">
        {{ searchStore.tripType === "round-trip" ? "Return Departure Time" : "Arrival Time" }}
      </label>
    </div>
  </div>

  <div class="search-panel__personal-detail-caption">Personal Information</div>
  <div class="search-panel__personal-detail">
    <div
      class="search-field"
      :class="{
        error: searchStore.formErrors.name && searchStore.requestFlightParams.firstName.length == 0,
      }"
    >
      <p class="form-error" v-if="searchStore.formErrors.name && searchStore.requestFlightParams.firstName.length == 0">
        {{ searchStore.formErrors.name }}
      </p>
      <input
        class="field-input"
        id="field-first-name"
        v-model="searchStore.requestFlightParams.firstName"
        autocomplete="off"
        type="text"
        placeholder=" "
      />
      <label class="field-label" for="field-first-name"> First name </label>
    </div>

    <div
      class="search-field"
      :class="{
        error: searchStore.formErrors.name && searchStore.requestFlightParams.lastName.length == 0,
      }"
    >
      <p class="form-error" v-if="searchStore.formErrors.name && searchStore.requestFlightParams.lastName.length == 0">
        {{ searchStore.formErrors.name }}
      </p>
      <input
        class="field-input"
        id="field-last-name"
        v-model="searchStore.requestFlightParams.lastName"
        autocomplete="off"
        type="text"
        placeholder=" "
      />
      <label class="field-label" for="field-last-name"> Last name </label>
    </div>

    <div
      class="search-field"
      :class="{
        error: searchStore.formErrors.email,
      }"
    >
      <p class="form-error" v-if="searchStore.formErrors.email">
        {{ searchStore.formErrors.email }}
      </p>
      <input
        class="field-input"
        id="field-email"
        v-model="searchStore.requestFlightParams.email"
        autocomplete="off"
        type="email"
        placeholder=" "
      />
      <label class="field-label" for="field-email"> Email </label>
    </div>

    <div
      class="search-field"
      :class="{
        error: searchStore.formErrors.phone && searchStore.requestFlightParams.phone.length == 0,
      }"
    >
      <p class="form-error" v-if="searchStore.formErrors.phone && searchStore.requestFlightParams.phone.length == 0">
        {{ searchStore.formErrors.phone }}
      </p>
      <input
        class="field-input"
        id="field-phone"
        v-model="searchStore.requestFlightParams.phone"
        autocomplete="off"
        type="tel"
        placeholder=" "
      />
      <label class="field-label" for="field-phone"> Phone number </label>
    </div>
  </div>

  <div class="search-panel__message">
    <div class="search-field">
      <input
        class="field-input"
        id="field-message"
        v-model="searchStore.requestFlightParams.msg"
        autocomplete="off"
        type="text"
        placeholder=" "
      />
      <label class="field-label" for="field-message"> Message </label>
    </div>
    <div class="search-button search-submit-btn">
      <button class="btn btn-primary" type="button" @click="searchStore.requestFlight(reqFlightCB)">Submit</button>
      <button @click="searchStore.isCustomerInfo = false" class="btn btn-primary change">Go back</button>
    </div>
  </div>
</template>
