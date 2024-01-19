<script setup>
import { onMounted } from "vue";
import { useCommonStore } from "@/stores/common";
import FeedbackSection from "@/components/sections/FeedbackSection.vue";
import StatsSection from "@/components/sections/StatsSection.vue";

const commonStore = useCommonStore();

onMounted(() => {
  commonStore.isSearchWidgetSticky = true;
});
</script>

<template>
  <section class="our-story-banner">
    <div class="container">
      <h1 className="our-story-header">Our story</h1>
      <p className="our-story-body">
        Welcome to Imperium Jets, a truly unparalleled and extraordinary service tailored exclusively for discerning
        travelers seeking the epitome of luxury and perfection in their private jet experiences.
      </p>
    </div>
  </section>

  <section className="section-our-stories">
    <div className="container">
      <div className="story-row">
        <div className="story-col left">
          <p className="article-info__body">
            Step into a world where luxury knows no boundaries and every desire is meticulously catered to. From
            personalized gourmet menus curated by Michelin-starred chefs to rare and vintage wines, every indulgence is
            meticulously crafted to surpass your expectations. Imperium Jets offers a bespoke selection of unique
            amenities along with a high strict safety standard, transforming your journey into an unforgettable adventure.
            <br><br>
            Imperium Jets embodies a new era of luxury travel, redefining the limits of indulgence and offering an
            extraordinary experience for those who demand only the extraordinary. Experience unrivaled comfort in our
            lavishly appointed jets, customized to your preferences. A team of dedicated concierges is on standby 24/7 to
            fulfill every one of your desires.
          </p>
          <img src="images/signature.png" loading="lazy" alt="Our Story" class="ceo-image"/>
        </div>
        <div className="story-col right">
          <img src="images/employee/ceo.png" alt="CEO Image">
        </div>
      </div>
    </div>
</section>
<StatsSection :class="'bg-grey-300'" />

<FeedbackSection /></template>
