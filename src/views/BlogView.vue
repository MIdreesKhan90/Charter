<script setup>
  import { ref, onMounted } from "vue";
  import MoreArticlesSection from "@/components/sections/MoreArticlesSection.vue";
  import { useCommonStore } from "@/stores/common";
  import { useArticleStore } from "@/stores/article";
  import { Navigation, Pagination, Autoplay } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/vue";

  import "swiper/scss";
  import "swiper/scss/navigation";
  import "swiper/scss/pagination";
  import "swiper/scss/autoplay";

  const modules = ref([Navigation, Pagination, Autoplay]);
  const commonStore = useCommonStore();
  const articleStore = useArticleStore();

  function initSwiper(swiper) {
    setTimeout(function () {
      swiper.slideNext();
    }, 100);
  }

  onMounted(() => {
    commonStore.isSearchWidgetSticky = true;
  });
</script>

<template>
  <section class="section-title">
    <div class="container">
      <h1 className="section-title-header">Blog</h1>
      <p className="section-title-body">
        Imperium Jets Charter is one of the fastest-growing private jet charter companies specializing in VIP and executive flights.
      </p>
    </div>
  </section>

  <section class="blog-slider-section">
    <swiper
      :modules="modules"
      :slides-per-view="1.5"
      :space-between="0"
      :loop="true"
      :initial-slide="1"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      navigation
      :centeredSlides="true"
      :pagination="{ clickable: true }"
      :breakpoints="{
        320: {
          slidesPerView: 1.2,
        },
        640: {
          slidesPerView: 1.5,
        },
      }"
      @swiper="initSwiper"
    >
      <template v-for="(item, i) in articleStore.articles">
        <swiper-slide v-if="articleStore.isArticlePromoted(item.id, 'blog')" :key="i">
          <div
            class="slide-item"
            :style="{
              '--article-bg': 'url(' + commonStore.publicData(`/articles/${item.id}.png`) + ')',
            }"
          >
            <RouterLink :to="'/article/' + item.url" class="about-blog">
              <h5 class="blog-slider-label">{{ item.date }}</h5>
              <h2 class="blog-slider-title">{{ item.title }}</h2>
              <p class="blog-slider-body" v-if="item.content">
                {{ commonStore.removeTags(item.content).slice(0, 150) + "..." }}
              </p>
              <div class="social-status" v-if="item.writer">
                <img
                  :src="commonStore.publicData(`/articles/${item.id}.writer.png`)"
                  :alt="item.writer"
                  loading="lazy"
                />
                <div class="about">
                  <h5>{{ item.writer }}</h5>
                </div>
              </div>
            </RouterLink>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </section>

  <MoreArticlesSection />
</template>
