import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useCommonStore } from "./common";
import emitter from "tiny-emitter/instance";
import axios from "axios";
import { useLoading } from "vue-loading-overlay";

export const useSearchStore = defineStore("search", () => {

  const commonStore = useCommonStore();
  const toast = useToast();
  const $loading = useLoading({
    // options
  });

  const travelerFocus = ref(false);

  const apiBaseURL = "https://api.impjets.com/v1/";

  const airportsPreList = ref([]);
  const jetsPreList = ref([]);

  const distance = ref("Not Found.");
  const flightTime = ref(0);

  const tripType = ref("one-way");
  const toggleMobileStickySearchWidgetState1 = ref(false);
  const isCustomerInfo = ref(false);

  const formErrors = ref({});

  const requestFlightParams = ref({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    msg: "",
    aircraft: "0",
    origin: "",
    dest: "",
    date: "",
    pax: 1,
    at: "",
    dt: "",
    callmeat: "",
    marketing_materials: "No",
    origin_details: {},
    destination_details: {},
  });

  let emptyVal = ref({ ...requestFlightParams.value });

  const body = document.querySelector("body");

  watch(toggleMobileStickySearchWidgetState1, function (newValue, oldValue) {
    if (newValue) {
      body.classList.add("search-sticky-state1");
    } else {
      body.classList.remove("search-sticky-state1");
    }
  });
  watch(isCustomerInfo, function (newValue, oldValue) {
    if (newValue) {
      body.classList.add("search-sticky-state3");
    } else {
      body.classList.remove("search-sticky-state3");
    }
  });

  function impapiDistance($pointA, $pointB) {
    const $R = 6371e3; // metres
    let M_PI = Math.PI;
    let $x1 = ($pointA["lat"] * M_PI) / 180; // φ, λ in radians
    let $x2 = ($pointB["lat"] * M_PI) / 180;
    let $dx = (($pointA["lat"] - $pointB["lat"]) * M_PI) / 180;
    let $dy = (($pointB["lng"] - $pointA["lng"]) * M_PI) / 180;
    let $a =
      Math.sin($dx / 2) * Math.sin($dx / 2) + Math.cos($x1) * Math.cos($x2) * Math.sin($dy / 2) * Math.sin($dy / 2);
    let $c = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1 - $a));
    return $c * $R * 0.000621371 * 0.868976;
  }

  function calculateDistance() {
    const lat1 = requestFlightParams.value.origin_details.coords_lat;
    const lon1 = requestFlightParams.value.origin_details.coords_long;
    const lat2 = requestFlightParams.value.destination_details.coords_lat;
    const lon2 = requestFlightParams.value.destination_details.coords_long;

    let $pointA = { lat: lat1, lng: lon1 };
    let $pointB = { lat: lat2, lng: lon2 };

    let d = impapiDistance($pointA, $pointB);
    distance.value = d.toFixed(2);
  }

  // Not in use for now
  function calc_distance(lat1, lat2, lng1, lng2) {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat1 - lat2) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * R * 0.000621371;
  }

  // Not in use for now
  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  function getAirportsPreList() {
    axios({
      method: "get",
      url: commonStore.publicData("/airports.json"),
    }).then(
      (res) => {
        airportsPreList.value = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function getJetsPreList() {
    axios({
      method: "get",
      url: commonStore.publicData("/jets.json"),
    }).then(
      (res) => {
        jetsPreList.value = res.data[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async function searchAirports(term) {
    if (term.length == 0) {
      return airportsPreList.value;
    }
    if (term.length < 2) return [];
    return await axios({
      method: "post",
      url: apiBaseURL + "ext.charter/airport",
      params: {
        srcterms: term,
      },
    }).then(
      (res) => {
        if (res.data.result) {
          return res.data.error;
        } else {
          return [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async function requestFlight(callback = null) {
    // curl -i -X POST
    // -H "Content-Type:multipart/form-data"
    // -F "name=roni iparoni"
    // -F "email=ron.bentata@gmail.com"
    // -F "phone=050-1234567"
    // -F "msg=testing this "
    // -F "aircraft=1"
    // -F "date=10/19/2022 - 10/23/2022"
    // -F "pax=2"
    // -F "origin=OAK"
    // -F "dest=VNY"
    // -F "dt=09:00 AM"
    // -F "at=01:00 PM"

    let params = {
      name: `${requestFlightParams.value.firstName} ${requestFlightParams.value.lastName}`,
      email: requestFlightParams.value.email,
      phone: requestFlightParams.value.phone,
      msg: requestFlightParams.value.msg,
      aircraft: requestFlightParams.value.aircraft,
      date: requestFlightParams.value.date,
      pax: requestFlightParams.value.pax,
      origin: requestFlightParams.value.origin,
      dest: requestFlightParams.value.dest,
      dt: requestFlightParams.value.dt,
      at: requestFlightParams.value.at,
    };

    // if (params.aircraft == "0") {
    //   formErrors.value.aircraft = "Aircraft Type is required";
    //   return;
    // } else {
    //   delete formErrors.value.aircraft;
    // }

    //if (!params.name.trim()) {
    if (requestFlightParams.value.firstName == "" || requestFlightParams.value.lastName == "") {
      formErrors.value.name = "Full Name (first+last) is required";
      return;
    } else {
      delete formErrors.value.name;
    }

    if (!commonStore.validateEmail(params.email)) {
      formErrors.value.email = "Valid Email is required";
      return;
    } else {
      delete formErrors.value.email;
    }

    //if (!params.phone.trim()) {
    if (requestFlightParams.value.phone.length == 0) {
      formErrors.value.phone = "Phone is required";
      return;
    } else {
      delete formErrors.value.phone;
    }

    // track Search event
    if (typeof fbq == "function") fbq("track", "SubmitApplication"); // Facebook
    if (typeof hj == "function") hj("event", "submit"); // HotJar
    if (typeof window.lintrk == "function") window.lintrk("track", { conversion_id: "11705810" }); // LinkedIn
    if (typeof gtag == "function")
      gtag("event", "submit", {
        submit_term: requestFlightParams.value.origin + " to " + requestFlightParams.value.dest,
        send_to: "G-XLCTXVRP9M/thankyou",
      }); // GA

    let loader = $loading.show({});
    await axios({
      method: "post",
      url: apiBaseURL + "ext.charter/request",
      params: params,
    }).then(
      (res) => {
        loader.hide();
        if (res.data.result) {
          isCustomerInfo.value = false;
          toggleMobileStickySearchWidgetState1.value = false;
          requestFlightParams.value = { ...emptyVal.value };
          emitter.emit("reset");
          if(callback){
            callback();
          }

          // track Thank You event
          if (typeof fbq == "function") fbq("track", "Lead"); // Facebook
          if (typeof window.lintrk == "function") window.lintrk("track", { conversion_id: "11705818" }); // LinkedIn
          if (typeof hj == "function") hj("event", "thankyou"); // HotJar
          if (typeof gtag == "function")
            gtag("event", "conversion", {
              action_term: "thankyou",
              send_to: "G-XLCTXVRP9M/thankyou",
            }); // GA will also track this as page_view
        } else {
          toast.error(res.data.error, {
            timeout: 3000,
          });
        }
      },
      (error) => {
        console.error(error);
        loader.hide();
      }
    );
  }

  function calculateFlightTime(speed, range) {
    const dist = tripType.value == "one-way" ? distance.value : distance.value * 2;

    let sum = 0;
    let extraHour = 0;

    if (dist > range) {
      let extraTimeTaken = dist / range;
      extraHour += parseInt(extraTimeTaken);
    }

    sum = parseFloat((dist / speed + extraHour).toFixed(2));

    let travelTime = sum;
    let hour = parseInt(travelTime);
    let remining_minute = travelTime % 1;
    hour = parseInt(hour) + parseInt(remining_minute > 0 ? 1 : 0);
    travelTime = hour;
    return hour;
  }

  function getFlightTimeByType() {
    let jetType = "";
    switch (requestFlightParams.value.aircraft) {
      case 1:
        jetType = "turbo";
        break;
      case 2:
        jetType = "light";
        break;
      case 3:
        jetType = "mid";
        break;
      case 4:
        jetType = "heavy";
        break;
    }
    calculateDistance();
    flightTime.value = calculateFlightTime(
      jetsPreList.value[jetType].crusingSpeed,
      jetsPreList.value[jetType].maxNmRange
    );
  }

  function getHourDiference() {
    let s = requestFlightParams.value.origin_details.hours_diff;
    let d = requestFlightParams.value.destination_details.hours_diff;
    let td = 0;
    // case 1 both are
    if (s > 0 && d > 0) {
      if (s > d) td = d - s;
      else if (d > s) td = d - s;
    } else if (s <= 0 && d >= 0) {
      td = Math.abs(s) + Math.abs(d);
    } else if (s > 0 && d <= 0) {
      td = -1 * (Math.abs(s) + Math.abs(d));
    } else if (s <= 0 && d <= 0) {
      if (Math.abs(s) > Math.abs(d)) td = Math.abs(s) - Math.abs(d);
      else if (Math.abs(s) < Math.abs(d)) td = -1 * (Math.abs(d) - Math.abs(s));
    }
    return td;
  }

  return {
    travelerFocus,
    tripType,
    airportsPreList,
    requestFlightParams,
    isCustomerInfo,
    formErrors,
    toggleMobileStickySearchWidgetState1,
    flightTime,
    getHourDiference,
    searchAirports,
    requestFlight,
    getFlightTimeByType,
    getAirportsPreList,
    getJetsPreList,
  };
});
