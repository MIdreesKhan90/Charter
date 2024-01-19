<script setup>
  import { onMounted } from "vue";
  import { useCommonStore } from "@/stores/common";
  import FeedbackSection from "@/components/sections/FeedbackSection.vue";

  const commonStore = useCommonStore();

  onMounted(() => {
    commonStore.isSearchWidgetSticky = true;
  });
</script>

<template>
  <section class="section-title">
    <div class="container">
      <h1 className="section-title-header">Our Services</h1>
      <p className="section-title-body">
        Our team is dedicated to providing an exceptional customer experience. We tailor our private aviation services
        to meet each client's needs, and remain committed to providing the most competitive prices in the industry.
      </p>
    </div>
  </section>

  <div class="our-services-section">
    <section className="section-articles reverse">
      <div className="section-articles__container">
        <div className="article-block">
          <img className="article-image" src="images/service-article-1.png" loading="lazy" alt="Charter flight" />
          <div className="article-info">
            <div className="article-info__title">Charter flight</div>
            <p className="article-info__body">
              Booking a charter flight on a private jet can be a challenging task.
              We at Imperium Jets understand this, and we are here for you.
              With access to over 8,000 recent private jets, Imperium jets offers private jet charter solutions for your travel plans worldwide.
              We only work with Argus-rated operators and commit to the highest safety regulations. 
              The experience with Imperium jets is different from anything you have known. Your personal executive will be in regular contact with you before and after the flight. We take care of everything. All that is left for you is to enjoy the journey.
              <br /><br />
              Your Travel, Our Expertise.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-articles">
      <div className="section-articles__container">
        <div className="article-block">
          <img className="article-image" src="images/service-article-2.png" loading="lazy" alt="Shared Flight" />
          <div className="article-info">
            <div className="article-info__title">Shared Flight</div>
            <p className="article-info__body">
              Flying private should be safe, simple, and designed around your needs. Share flights can be more affordable and convenient for individuals or small groups traveling to a specific destination. 
              Interested in joining an existing flight or adding more people to your flight? We will help you find the right partner easily and quickly.
              <br /><br />
              Your Travel, Our Expertise.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-articles reverse">
      <div className="section-articles__container">
        <div className="article-block">
          <img className="article-image" src="images/service-article-3.png" loading="lazy" alt="By The Seat" />
          <div className="article-info">
            <div className="article-info__title">By The Seat</div>
            <p className="article-info__body">
              Our goal is to make private aviation accessible to the public.
              Imperium Jets aims to enable its customers to book a seat on a private flight. We hold a DOT approval that allows us to operate By The Seat flights.
              By The Seat solution can be an excellent advantage for individuals that want to enjoy a set price and scheduled flight independent of the other passenger's constraints.
              So while other companies expect you to fit into one of their plans, we know you deserve a plan tailored to fit you. 
              <br /><br />
              Your Travel, Our Expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <FeedbackSection />
</template>
