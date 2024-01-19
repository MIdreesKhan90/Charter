<script setup>
import { ref } from "vue";
import emitter from "tiny-emitter/instance";
import { useSearchStore } from "@/stores/search.js";

const searchStore = useSearchStore();
const props = defineProps({
  type: String,
  defaultValue: String,
});

const showList = ref(false);
let origin = ref("");
let searchTerm = ref(props.defaultValue);
let list = ref([]);
let firstClick = true;

emitter.on("focuInput", function (value) {
  if (value.type == "origin") {
    document.getElementById("origin").focus();
    initialize();
  } else if (value.type == "destination") {
    document.getElementById("destination").focus();
    initialize();
  }
});

emitter.on("exchangeInputField", function (value) {
  if (value.type == props.type) {
    searchTerm.value = value.value;
  }
});

emitter.on("reset", function () {
  searchTerm.value = "";
  list.value = searchStore.airportsPreList;
});

const initialize = async () => {
  if (firstClick) {
    list.value = searchStore.airportsPreList;
    firstClick = false;
  }
};

const searchOrigin = async () => {
  if(searchTerm.value.length == 0){
    searchStore.requestFlightParams.origin = ""
  }
  list.value = await searchStore.searchAirports(searchTerm.value);
};

const selectOrigin = (event, country) => {
  let val = `${country.name}  [${country.code}]`;
  origin.value = country.name;
  searchTerm.value = val;
  showList.value = false;

  emitter.emit("updateInput", props.type, { name: val, details: country });

  if (props.type == "origin")
    emitter.emit("focuInput", { type: "destination" });

  if (props.type == "destination")
    emitter.emit("focuInput", { type: "dateTimePicker" });
};

function handleFocusOut() {
  setTimeout(function () {
    showList.value = false;
  }, 200);
}

function handleFocus() {
  setTimeout(function () {
    showList.value = true;
  }, 200);
}
</script>

<template>
  <input
    class="field-input"
    :id="props.type"
    ref="searchInput"
    autocomplete="off"
    @focus="handleFocus"
    @focusout="handleFocusOut"
    type="text"
    placeholder=" "
    :value="searchTerm"
    @input="(e) => (searchTerm = e.target.value)"
    @click="initialize()"
    @keyup="searchOrigin()"
  />
  <ul
    class="airport-listing"
    v-if="typeof list != 'undefined' && list.length && showList"
  >
    <li v-for="(item, i) in list" :key="i" @click="selectOrigin($event, item)">
      <div class="airtport-block">
        <div>
          <h5>{{ item.name }}</h5>
          <p>{{ item.address }}</p>
        </div>
        <h4>{{ item.code }}</h4>
      </div>
    </li>
  </ul>
</template>
