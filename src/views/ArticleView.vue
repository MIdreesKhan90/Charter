<script setup>
import { onMounted, ref, computed } from "vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import Search from "@/components/search-widget/Search.vue";
import FeedbackSection from "@/components/sections/FeedbackSection.vue";
import SupportSection from "@/components/sections/SupportSection.vue";
import { useRoute } from "vue-router";

import { useCommonStore } from "@/stores/common";
import { useArticleStore } from "@/stores/article";

import Axios from "axios";

const commonStore = useCommonStore();
const articleStore = useArticleStore();

const route = useRoute();

const article = ref();
const articleKey = ref();

const relatedArticles = ref([]);

function getRelatedArticles(keys) {
  relatedArticles.value = [];
  Object.keys(articleStore.articles).filter((key) => {
    let index = keys.findIndex((item) => item == key);
    if (index >= 0) {
      relatedArticles.value.push(articleStore.articles[key]);
    }
  });
}

const articleBySlug = computed(() => {
  Object.keys(articleStore.articles).filter((key) => {
    if (articleStore.articles[key].url == route.params.id) {
      article.value = articleStore.articles[key];
      articleKey.value = key;
      getRelatedArticles(article.value["more"]);
    }
  });
  return article.value;
});

onMounted(() => {
  commonStore.isSearchWidgetSticky = true;
});
</script>
<template>
  <HeaderLayout :fixed="false" />
  <Search />

  <section v-if="articleBySlug" class="article-section">
    <div class="article-bg">
      <div class="article-header">
        <div class="article-info__source">
          {{ articleBySlug["source"] }}
        </div>
        <div class="article-info__title">
          {{ articleBySlug["title"] }}
        </div>
        <h5>{{ articleBySlug["date"] }}</h5>
      </div>
      <div class="articles">
        <img
          class="article-image"
          :title="articleBySlug['title']"
          :src="commonStore.publicData(`/articles/${articleKey}.png`)"
          :alt="articleBySlug['title']"
          loading="lazy"
        />
        <div v-html="articleBySlug['content']"></div>
      </div>
      <div class="share-article">
        <div class="share">
          <i class="icon-share"></i>
          Share on:
        </div>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${commonStore.articlePath + articleBySlug['url']}`"
          onclick="window.open(this.href, 'popupwindow', 'width=500,height=300'); return false;"
          target="_blank"
        >
          <i class="icon-share-facebook"></i>
        </a>
        <a
          :href="`https://twitter.com/intent/tweet?url=${commonStore.articlePath + articleBySlug['url']}&amp;text=${
            articleBySlug['title']
          }`"
          onclick="window.open(this.href, 'popupwindow', 'width=500,height=300'); return false;"
          target="_blank"
        >
          <i class="icon-share-twitter"></i>
        </a>
        <a
          :href="`https://www.linkedin.com/shareArticle?mini=true&url=${
            commonStore.articlePath + articleBySlug['url']
          }/&amp;title=${articleBySlug['title']}`"
          onclick="window.open(this.href, 'popupwindow', 'width=500,height=300'); return false;"
        >
          <i class="icon-share-linkedin"></i>
        </a>
        <a
          :href="`https://wa.me/?text=I found this amazing private jet service Imperium Jets. check out this great article: ${
            articleBySlug['title']
          } ${commonStore.articlePath + articleBySlug['url']}`"
          target="_blank"
        >
          <i class="icon-share-whatsapp"></i>
        </a>
      </div>
    </div>
  </section>

  <section class="news-blog-section">
    <div class="container">
      <div className="article-info__title">More News</div>
      <div class="blog-card-main">
        <RouterLink :to="'/article/' + item.url" v-for="(item, i) in relatedArticles" class="blog-card">
          <img :src="commonStore.publicData(`/articles/${item.id}.png`)" :alt="item.title" loading="lazy"/>
          <h2>{{ item.title }}</h2>
          <p>
            {{ item["seo-desc"] }}
          </p>
          <div class="social-status">
            <img
              v-if="item.writer"
              :src="commonStore.publicData(`/articles/${item.id}.writer.png`)"
              :alt="item.writer"
              loading="lazy"
            />
            <div class="about">
              <h5 v-if="item.writer">{{ item.writer }}</h5>
              <p v-if="item.date">{{ item.date }}</p>
            </div>
          </div>
          <br />
          <div class="article-link">Read more <i class="icon-article-right-chevron"></i></div>
        </RouterLink>
      </div>
    </div>
  </section>

  <FeedbackSection />

  <SupportSection />

  <FooterLayout />
</template>
