import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useCommonStore } from "@/stores/common";
import Axios from "axios";

export const useArticleStore = defineStore("article", () => {
  const commonStore = useCommonStore();
  const articles = ref([]);
  const newsArticles = ref([]);
  const blogArticles = ref([]);
  const newsPromotedArticles = ref([]);
  const blogPromotedArticles = ref([]);

  async function getArticles(callback = null) {
    await Axios({
      method: "get",
      url: commonStore.publicData("/articles/imp.charter.articles.json"),
    })
	  .then((res) => {
        articles.value = res.data[0].articles;
        newsArticles.value = res.data[0].links.news;
        blogArticles.value = res.data[0].links.blog;
        newsPromotedArticles.value = res.data[0].promoted.news;
        blogPromotedArticles.value = res.data[0].promoted.blog;
        getArticleContent();
        if(callback){
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


function getArticleContent() {
  Object.keys(articles.value).filter((key) => {
    Axios({
      method: "get",
      url: `${commonStore.publicData("/articles/" + key + ".html")}`,
    }).then(
      (res) => {
        articles.value[key].content = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  });

}

  function isArticleType(id, type) {
    if (type == "news") {
      let ind = newsArticles.value.findIndex((i) => {
        return i == id;
      });
      if (ind >= 0) {
        return true;
      }
      return false;
    } else {
      let ind = blogArticles.value.findIndex((i) => {
        return i == id;
      });
      if (ind >= 0) {
        return true;
      }
      return false;
    }
  }

  function isArticlePromoted(id, type) {
    if (type == "news") {
      let ind = newsPromotedArticles.value.findIndex((i) => {
        return i == id;
      });
      if (ind >= 0) {
        return true;
      }
      return false;
    } else {
      let ind = blogPromotedArticles.value.findIndex((i) => {
        return i == id;
      });
      if (ind >= 0) {
        return true;
      }
      return false;
    }
  }

  onMounted(() => {
    {
      getArticles();
    }
  });

  return {
    articles,
    newsArticles,
    blogArticles,
    newsPromotedArticles,
    blogPromotedArticles,
    getArticles,
    isArticleType,
    isArticlePromoted,
  };
});
