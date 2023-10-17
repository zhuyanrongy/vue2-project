import Vue from 'vue'
import Vuex from 'vuex'
import handelProduct from './product/handelProduct'
import createPersistedState from "vuex-persistedstate";
import collapse from "./collapse/collapse.js"
import advert from "./advert/advert.js"
import lang from "./lang/lang.js"
import login from "./login/login.js"
import menu from "./menu/menu.js"
Vue.use(Vuex)
const dataState = createPersistedState({
  key: 'VueDate',
  paths: ['handelProduct', 'collapse', 'advert', 'lang', 'login']
})
export default new Vuex.Store({
  modules: { handelProduct, collapse, advert, lang, login, menu },
  plugins: [dataState]
})

