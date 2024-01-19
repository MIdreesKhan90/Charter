import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", () => {
  const baseURL = process.env.BASE_URL;
  const siteOrigin = window.location.origin;
  const articlePath = siteOrigin + baseURL + "article/";

  const isSearchWidgetSticky = ref(false);

  watch(isSearchWidgetSticky,function(newValue, oldValue){
    const body = document.querySelector("body");
    if(newValue){
      body.classList.add('search-is-sticky');
    }else{
      body.classList.remove('search-is-sticky');
    }
  })

  const isToggleMenu = ref(false);

  function publicImage(img) {
    return baseURL + "images" + img;
  }
  function publicData(file) {
    return baseURL + "data" + file;
  }

  function validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return {
    isToggleMenu,
    articlePath,
    isSearchWidgetSticky,
    publicImage,
    publicData,
    validateEmail,
    removeTags,
  };
});
