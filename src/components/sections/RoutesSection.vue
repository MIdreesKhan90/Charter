<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = ref([Navigation, Pagination]);

const requestedRoutes = ref([
  {
    img: "images/routes/route1.png",
    title: "Los Angeles - Las Vegas",
    price: "Starts at $8,000",
    origin: "KLAX",
    destination: "KLAS",
  },
  {
    img: "images/routes/route2.png",
    title: "Los Angeles - San Francisco",
    price: "Starts at $8,500",
    origin: "KLAX",
    destination: "KSFO",
  },
  {
    img: "images/routes/route3.png",
    title: "Honolulu - Lanai City",
    price: "Starts at $7,500",
    origin: "PHNL",
    destination: "PHNY",
  },
]);
</script>

<template>
  <section className="section-routes">
    <div className="container">
      <div className="section-routes__caption">Requested routes</div>
      <div className="section-routes__list routes-list only-desktop">
        <div
          v-for="(item, i) in requestedRoutes"
          :key="i"
          className="routes-list__item route-item"
        >
          <img
            :src="item.img"
            :alt="item.title"
            className="route-item__image"
            loading="lazy"
          />
          <div className="route-item__detail route-detail-box">
            <div class="route-detail-box-inner">
              <div className="route-detail-box__route">
                {{ item.title }}
              </div>
              <div className="route-detail-box__price">{{ item.price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-routes__list routes-list has-swiper only-mobile">
        <swiper
          :modules="modules"
          :slides-per-view="1.2"
          :space-between="25"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :pagination="{ clickable: true }"
          :breakpoints="{
            320: {
              slidesPerView: 1.2,
            },
          }"
        >
          <swiper-slide v-for="(item, i) in requestedRoutes" :key="i">
            <div className="routes-list__item route-item">
              <img
                :src="item.img"
                :alt="item.title"
                className="route-item__image"
                loading="lazy"
              />
              <div className="route-item__detail route-detail-box">
                <div class="route-detail-box-inner">
                  <div className="route-detail-box__route">
                    {{ item.title }}
                  </div>
                  <div className="route-detail-box__price">
                    {{ item.price }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
