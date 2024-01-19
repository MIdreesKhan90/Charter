<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

const logos = ref([
  {
    title: "AIN online",
    img: "AIN-online.svg",
  },
  {
    title: "Business Air News",
    img: "business-air-news.svg",
  },
  {
    title: "Business Airport",
    img: "business-airport.svg",
  },
  {
    title: "Business Jet Traveler",
    img: "business-jet-traveler.svg",
  },
  {
    title: "Corporate Jet Investor",
    img: "corporate-jet-investor.svg",
  },
  {
    title: "Live and Lets Fly",
    img: "live-and-lets-fly.svg",
  },
]);

const modules = ref([Autoplay]);
</script>

<template>
  <section className="section-news">
    <div class="">
      <div className="news-links-box">
        <swiper
          :modules="modules"
          :slides-per-view="6"
          :space-between="5"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            320: {
              slidesPerView: 1.5,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 6,
            },
          }"
        >
          <swiper-slide v-for="(item, i) in logos" :key="i">
            <div className="news-link">
              <img :src="'images/logos/news/' + item.img" :alt="item.title" :title="item.title" loading="lazy"/>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
