<script setup>
import { onMounted } from "vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import Search from "@/components/search-widget/Search.vue";
// import LastOrders from "@/components/LastOrders.vue";
import RoutesSection from "@/components/sections/RoutesSection.vue";
import NewsSection from "@/components/sections/NewsSection.vue";
import StatsSection from "@/components/sections/StatsSection.vue";
import FeedbackSection from "@/components/sections/FeedbackSection.vue";
import SupportSection from "@/components/sections/SupportSection.vue";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();
onMounted(() => {
  commonStore.isSearchWidgetSticky = false;
});
</script>

<template>
  <HeaderLayout :fixed="true" />

  <main>
    <section className="section-hero">
      <div class="video-container">
        <div class="embed-16by9">
          <iframe
            className="iframe-vid"
            src="https://www.youtube.com/embed/FLFgvYg4U8A?hd=1&amp;modestbranding=1&amp;wmode=transparent&amp;autohide=1&amp;rel=0&amp;showinfo=0&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;playsinline=1&amp;playlist=FLFgvYg4U8A&amp;loop=1"
            title=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            autoplay=""
            loop=""
            muted=""
            playsinline=""
          ></iframe>
        </div>
      </div>

      <img className="iframe-img" src="images/hero-bg.png" loading="lazy" />
      <div className="iframe-overflow"></div>
      <!-- <LastOrders /> -->

      <ul className="companies-panel">
        <li>
          <img src="images/logos/nbaa-logo-white.png" width="129" height="30" alt="nbaa" loading="lazy"/>
        </li>
        <li>
          <img src="images/dot-part-380-white.svg" alt="dot" loading="lazy"/>
        </li>
        <li>
          <img src="images/customers-review.svg" alt="customers-review" loading="lazy"/>
        </li>
      </ul>
    </section>

    <Search />

    <section className="section-slogan">
      <div className="container">
        <div className="slogan">
          <h3 className="slogan__label">Charter, Shared, and By The Seat flights</h3>
          <h4 className="slogan__detail">Your Travel, Our Expertise</h4>
          <p className="slogan__info">
            Our team is dedicated to providing an exceptional customer experience. We tailor our private aviation
            services to meet each client's needs, and remain committed to providing the most competitive prices in the
            industry.
          </p>
        </div>
      </div>
    </section>

    <NewsSection />

    <RoutesSection />

    <section className="section-articles">
      <div className="section-articles__container">
        <div className="article-block">
          <img className="article-image" src="data/articles/13.png" loading="lazy" alt="Article name" />
          <div className="article-info">
            <div className="article-info__source hidden">Live and Let's Fly</div>
            <div className="article-info__title">Private Charter Flights - Cancelation Policies</div>
            <p className="article-info__body">
              Private charter flights are a popular option for those looking for a more flexible and personalized flying
              experience. However, like with any type of travel, the possibility of cancellations is always there. No
              one likes to think about canceling a trip, but it's a possibility that should always be considered. It's
              essential to understand the cancellation policy for charter flights to avoid any potential issues or extra
              costs.
            </p>
            <RouterLink className="article-info__link" to="/article/13-private-charter-flights-cancelation-policies">
              Read more <i class="icon-article-right-chevron"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section className="section-articles reverse">
      <div className="section-articles__container">
        <div className="article-block">
          <img className="article-image" src="data/articles/11.png" loading="lazy" alt="Article name" />
          <div className="article-info">
            <div className="article-info__source hidden">Corporate Jet Investor</div>
            <div className="article-info__title">How to choose the right broker for your private jet rental?</div>
            <p className="article-info__body">
              There once was a man named John who was in dire need of a break from the hustle and bustle of city life.
              He wanted to escape to a tropical paradise and soak up the sun and do so in style. So he decided to book a
              private jet, but, as John soon discovered, finding the right charter broker was easier said than done.
            </p>
            <RouterLink className="article-info__link" to="/article/11-choose-broker-private-jet-rental">
              Read more <i class="icon-article-right-chevron"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <StatsSection :class="'home-page'" />

    <section className="section-ceo">
      <div className="ceo-block">
        <img className="ceo-portrait" loading="lazy" src="images/employee/ceo.png" alt="CEO portrait" />

        <div className="ceo-quotas">
          <p className="ceo-quotas__text">
            “When Ron Bentata and I founded Imperium Jets we had only one thing in mind: 
            making the rental of private jets seamless, and accessible, 
            and minimizing bureaucracy to zero. We are super excited to say ‘we are here!’. 
            Now you can lean back and let us take care of you. 
            We welcome you to a journey like no other on a luxurious private jet for your enjoyment. 
            Just a headache-free process to a once-in-a-lifetime sensation, you can always revisit.”
          </p>
          <div className="ceo-quotas__name">Lidor Revah</div>
          <div className="ceo-quotas__position">Co-founder & CEO</div>
        </div>
      </div>
    </section>

    <FeedbackSection />

    <SupportSection />
  </main>

  <FooterLayout />
</template>
