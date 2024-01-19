<script setup>
import { ref } from "vue";
import axios from "axios";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();
const base_url = ref("https://api.impjets.com/v1/");
const email = ref("");
const email_error = ref("");
const inProgress = ref(false);
const mailSent = ref(false);

function subscribeEmail(e) {
  if (isCorrectEmail()) {
    // Send Mail
    inProgress.value = true;

    axios({
      method: "post",
      url: base_url.value + "ext.imp/newsletter",
      params: {
        email: email.value,
      },
    })
      .then(function (res) {
        inProgress.value = false;
        if (res.data.result) {
          email.value = "";
          mailSent.value = true;

          // track Newsletter event
          if(typeof(fbq)=='function') fbq('track', 'CompleteRegistration'); // Facebook
          if(typeof(hj)=='function') hj('event','newsletter'); // HotJar
          if(typeof(window.lintrk)=='function') window.lintrk('track',{'conversion_id':'11705794'}); // LinkedIn
          if(typeof(gtag)=='function') gtag('event','success', {
            'action_term': 'newsletter',
            'send_to': 'G-XLCTXVRP9M/thankyou'
          }); // GA
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    email_error.value = "Please enter this field";
  }
}
function checkError(e) {
  if (isCorrectEmail()) {
    email_error.value = "";
  } else {
    email_error.value = "Please enter this field";
  }
}
function isCorrectEmail() {
  if (email.value === "") {
    return false;
  } else {
    if (commonStore.validateEmail(email.value)) {
      return true;
    } else {
      return false;
    }
  }
}

// track events
function fire_event(which){
  // fire the Phone Call event
  if(which == 'phone'){
    if(typeof(fbq)=='function') fbq('track', 'Contact'); // Facebook
    if(typeof(hj)=='function') hj('event','phone_footer'); // HotJar
    if(typeof(window.lintrk)=='function') window.lintrk('track',{'conversion_id':'11705778'}); // LinkedIn
    if(typeof(gtag)=='function') gtag('event','success', {
      'action_term': 'phone_footer',
      'send_to': 'G-XLCTXVRP9M/thankyou'
    }); // GA
  
  // fire the WhatsApp Chat event
  }else if(which == 'wa'){
    if(typeof(fbq)=='function') fbq('track', 'Contact'); // Facebook
    if(typeof(hj)=='function') hj('event','whatsapp_footer'); // HotJar
    if(typeof(window.lintrk)=='function') window.lintrk('track',{'conversion_id':'11705786'}); // LinkedIn
    if(typeof(gtag)=='function') gtag('event','success', {
      'action_term': 'whatsapp_footer',
      'send_to': 'G-XLCTXVRP9M/thankyou'
    }); // GA
  }
}
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-top">
        <div class="footer-unit">
          <h4>DISCLAIMER</h4>
          <p>
            Imperium Jets Inc is not an Air Carrier nor an Operator. Imperium Jets does not own or operate any aircraft.
            Operational control of all charter flights is provided by FAR Part 135 or 121 air carriers or the foreign
            equivalent. All services are subject to the
            <a target="_blank" href="https://bytheseat.com/terms">terms of use</a>.
          </p>
          <div class="access">
            <i class="icon-accessibility"></i>
            Accessibility
          </div>
        </div>
        <div class="footer-unit">
          <h4>SUPPORT</h4>
          <div class="support-list">
            <div class="support-list__item">
              <a class="support-list__head" href="https://wa.me/14344436040" target="_blank" @click="fire_event('wa')">
                <i class="icon-contact-whatsapp"></i>
                <span>Chat with us</span>
              </a>
            </div>
            <div class="support-list__item">
              <div class="support-list__head">
                <i class="icon-contact-phone"></i>
                <span>Call us</span>
              </div>
              <a class="support-list__value" href="tel:+1.844.332.5701" target="_blank" @click="fire_event('phone')">+1.844.332.5701</a>
            </div>
            <div class="support-list__item">
              <div class="support-list__head">
                <i class="icon-contact-email"></i>
                <span>Email</span>
              </div>
              <a class="support-list__value" href="mailto:support@impjets.com" target="_blank">support@impjets.com</a>
            </div>
            <div class="support-list__item hidden">
              <div class="support-list__head">
                <i class="icon-globe"></i>
                <span>Our office</span>
              </div>
              <a
                class="support-list__value"
                href="https://www.google.com/maps/place/3705+W+Pico+Blvd,+Los+Angeles,+CA+90019,+USA/@34.0475447,-118.3237152,17z"
                target="_blank"
              >
                3705 W Pico Blvd (#591),<br />
                Los Angeles, CA, 90019-3451
              </a>
            </div>
          </div>
        </div>
        <div class="footer-content">
          <a class="logo" target="_blank" href="https://impjets.com/">
            <img src="@/assets/images/svg/logo-blue.svg" alt="logo" loading="lazy" />
          </a>
          <p>Get the latest on Imperium Private Jet Flights.</p>
          <form @submit.prevent="subscribeEmail(event)" class="footer-subscribe" v-if="!mailSent">
            <input
              :class="{ error: email_error !== '' ? true : false }"
              @keyup="checkError($event)"
              v-model="email"
              type="email"
              placeholder="Email address"
              required
            />
            <button class="btn btn-primary btn-sm btn-subscribe" type="submit">
              {{ inProgress ? "Subscribing.." : "Subscribe" }}
            </button>
          </form>
          <div class="success-content" v-else>
            <h5>WELCOME ABOARD!</h5>
            <p>Thank you for joinging our Newsletter.</p>
          </div>

          <div class="footer-social">
            <h5>Follow us</h5>
            <ul>
              <li>
                <a href="https://facebook.com/ImperiumJets/" target="_blank" nofollow="" noindex="">
                  <i class="icon-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/by_the_seat/" target="_blank" nofollow="" noindex="">
                  <i class="icon-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/imperium-jets/" target="_blank" nofollow="" noindex="">
                  <i class="icon-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-payments">
            <h5>Payments methods</h5>
            <ul>
              <li>
                <img src="@/assets/images/home/cards/master.svg" alt="master" loading="lazy" />
              </li>
              <li>
                <img src="@/assets/images/home/cards/visa.svg" alt="visa" loading="lazy" />
              </li>
              <li>
                <img src="@/assets/images/home/cards/amex.svg" alt="amex" loading="lazy" />
              </li>
              <li>
                <img src="@/assets/images/home/cards/paypal.svg" alt="paypal" loading="lazy" />
              </li>
              <li>
                <img src="@/assets/images/home/cards/bitcoin.svg" alt="bitcoin" loading="lazy" />
              </li>
              <li>
                <img src="@/assets/images/home/cards/discover.svg" alt="discover" loading="lazy" />
              </li>
            </ul>
          </div>
        </div>
        <ul class="footer-companies">
          <li>
            <a
              class="frhzbus"
              target="_blank"
              href="https://www.bbb.org/us/ca/los-angeles/profile/aviation-services/imperium-jets-inc-1216-
                            1293605#bbbseal"
              title="Imperium Jets, Inc. is a BBB Accredited Aviation Service in Los
                            Angeles, CA"
              ><img
                style="padding: 0px; border: none"
                src="https://seal-sanjose.bbb.org/logo/frhzbus/imperium-jets-1293605.png"
                width="132"
                height="28"
                alt="Imperium Jets, Inc. is a BBB Accredited Aviation Service in Los Angeles,
                            CA"
                loading="lazy"
            /></a>
          </li>
          <li>
            <img :src="commonStore.publicImage('/logos/nbaa-logo-blue.png')" width="100" height="23" alt="nbaa" loading="lazy"/>
          </li>
          <li>
            <img src="@/assets/images/home/companies/dot.svg" width="122" height="37" alt="dot" loading="lazy"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <div class="footer-bottom">
          <ul>
            <!--
            <li>
              <a href="https://bytheseat.com/terms-flight" target="_blank">Terms of Flight</a>
            </li>
            -->
            <li>
              <a href="https://bytheseat.com/privacy" target="_blank">Privacy</a>
            </li>
            <li>
              <a href="https://bytheseat.com/cookies" target="_blank">Cookies</a>
            </li>
            <li>
              <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" rel="nofollow noopener" target="_blank">Covid-19 Guidelines</a>
            </li>
          </ul>
          <div class="external-links">
            <p>© 2023 Imperiun jets. All rights reserved.</p>
            <div>
              <a href="https://tcrcinfo.org/" target="_blank">TCRC</a> ID: #708461 /
              <a href="https://oag.ca.gov/travel" target="_blank">Seller of Travel</a>
              ID: #2146363-40
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
