
<script setup>
  import { useCommonStore } from "@/stores/common";
  import { useArticleStore } from "@/stores/article";
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  const commonStore = useCommonStore();
  const articleStore = useArticleStore();
  const articles = ref(null);
  const promotedArticles = ref(null);
  const route = useRoute();
  const sectionTitle = ref("More Articles");

  function setMoreArticles() {
    if (route.name == "blog") {
      sectionTitle.value = "More Blog Posts";
      promotedArticles.value = articleStore.blogPromotedArticles;
      articles.value = articleStore.blogArticles;
    } else if (route.name == "news") {
      sectionTitle.value = "More News";
      promotedArticles.value = articleStore.newsPromotedArticles;
      articles.value = articleStore.newsArticles;
    }
  }

  onMounted(() => {
    articleStore.getArticles(setMoreArticles);
  });
</script>

<template>
  <section class="news-blog-section" v-if="articles && promotedArticles.length < articles.length">
    <div class="container">
      <div className="article-info__title">{{ sectionTitle }}</div>
      <div class="blog-card-main">
        <template v-for="(item, i) in articles">
          <RouterLink
            v-if="!articleStore.isArticlePromoted(item, route.name)"
            :key="i"
            :to="'/article/' + articleStore.articles[item].url"
            class="blog-card"
          >
            <img
              :src="commonStore.publicData(`/articles/${item}.png`)"
              :alt="articleStore.articles[item].title"
              loading="lazy"
            />
            <h2>{{ articleStore.articles[item].title }}</h2>
            <p>
              {{ articleStore.articles[item]["seo-desc"] }}
            </p>
            <div class="social-status">
              <img
                v-if="articleStore.articles[item].writer"
                :src="commonStore.publicData(`/articles/${item}.writer.png`)"
                :alt="articleStore.articles[item].writer"
                loading="lazy"
              />
              <div class="about">
                <h5 v-if="articleStore.articles[item].writer">
                  {{ articleStore.articles[item].writer }}
                </h5>
                <p v-if="articleStore.articles[item].date">{{ articleStore.articles[item].date }}</p>
              </div>
            </div>
            <br />
            <div class="article-link">Read more <i class="icon-article-right-chevron"></i></div>
          </RouterLink>
        </template>
      </div>
    </div>
  </section>
</template>
