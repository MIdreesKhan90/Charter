<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();

const feedbacks = ref([
  {
    name: "Brandon Miller, USA",
    title: "Such a hassle free experience",
    body: "Definitely the smoothest process to get cross country.",
    date: "Nov 19, 2021",
  },
  {
    name: "Danielle Yehudai, USA",
    title: "Such a hassle free experience",
    body: "I managed to save a lot of time in my day by using Imperium Jets booking and by the seat services.",
    date: "Nov 19, 2021",
  },
  {
    name: "Rinat Rokach, USA",
    title: "Such a hassle free experience",
    body: "Thank you for a great experience! I had a great flight, it was comfortable & peaceful.",
    date: "Nov 19, 2021",
  },
  {
    name: "Ido Bartana, USA",
    title: "Such a hassle free experience",
    body: "Not having to go through the lines of security is amazing! Service is great for quick same-day trips.",
    date: "Nov 19, 2021",
  },
  {
    name: "Emily Karlsson, USA",
    title: "Such a hassle free experience",
    body: "I can see why anyone would want to travel for work or pleasure with Imperium Jets!",
    date: "Nov 19, 2021",
  },
  {
    name: "Pavel Levin, USA",
    title: "Such a hassle free experience",
    body: "Great service! Saved time, hours of flight research.Our executive level feels the difference.",
    date: "Nov 19, 2021",
  },
]);

const modules = ref([Autoplay]);
</script>

<template>
  <section className="section-feedback">
    <div class="container-fluid">
      <div className="section-feedback__title">What customers say about us</div>
      <div className="section-feedback__subtitle">
        We do our best to provide you the best experience ever
      </div>
      <div className="feedback-list">
        <swiper
          :modules="modules"
          :slides-per-view="4"
          :space-between="24"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            320: {
              slidesPerView: 1.3,
            },
            540: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 4,
            },
          }"
        >
          <swiper-slide v-for="(item, i) in feedbacks" :key="i">
            <div className="feedback-unit">
              <div className="feedback-unit__head">
                <img :src="commonStore.publicImage('/rating.svg')" alt="rating" loading="lazy" />
                <span className="feedback-unit__date">{{ item.date }}</span>
              </div>
              <div className="feedback-unit__content">
                <div className="feedback-unit__title hidden">
                  {{ item.title }}
                </div>
                <p className="feedback-unit__body">
                  {{ item.body }}
                </p>
                <span className="feedback-unit__line"></span>
                <div className="feedback-unit__consumer">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
