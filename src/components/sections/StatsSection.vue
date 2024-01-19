<script setup>
import CountUp from "vue-countup-v3";
const props = defineProps({
  class: String,
});
</script>

<template>
  <section class="section-statistic" :class="class">
    <div class="container">
      <div class="statistic-list">
        <div class="statistic-unit">
          <div class="statistic-unit__value">
            4,000+
          </div>
          <div class="statistic-unit__line"></div>
          <div class="statistic-unit__caption">World’s Safest Jets</div>
        </div>
        <div class="statistic-unit">
          <div class="statistic-unit__value">A+</div>
          <div class="statistic-unit__line"></div>
          <div class="statistic-unit__caption">BBB Raiting</div>
        </div>
        <div class="statistic-unit">
          <div class="statistic-unit__value">
            1,000+
          </div>
          <div class="statistic-unit__line"></div>
          <div class="statistic-unit__caption">Destinations World Wide</div>
        </div>
      </div>
    </div>
  </section>
</template>
