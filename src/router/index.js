import { createRouter, createWebHistory } from "vue-router";
import { useCommonStore } from "@/stores/common";
import { useSearchStore } from "@/stores/search";
import MainLayout from "@/layouts/MainLayout.vue";

import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import NewsView from "@/views/NewsView.vue";
import BlogView from "@/views/BlogView.vue";
import OurStoryView from "@/views/OurStoryView.vue";
import OurServicesView from "@/views/OurServicesView.vue";
import ThankYou from "@/views/ThankYou.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/article/:id",
      name: "article",
      component: ArticleView,
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
      meta: {
        layout: MainLayout,
      },
    },
    {
      path: "/blog",
      name: "blog",
      component: BlogView,
      meta: {
        layout: MainLayout,
      },
    },
    {
      path: "/our-story",
      name: "our-story",
      component: OurStoryView,
      meta: {
        layout: MainLayout,
      },
    },
    {
      path: "/our-services",
      name: "our-services",
      component: OurServicesView,
      meta: {
        layout: MainLayout,
      },
    },
    {
      path: "/thankyou",
      name: "thankyou",
      component: ThankYou,
    },
  ],
});

router.beforeEach((to, from) => {
  const commonStore = useCommonStore();
  const searchStore = useSearchStore();

  commonStore.isToggleMenu = false;
  searchStore.isCustomerInfo = false;
  window.scrollTo(0, 0);
  // explicitly return false to cancel the navigation
  // return false
});

export default router;
