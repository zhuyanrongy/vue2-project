import Vue from 'vue'
import Vuex from 'vuex'
import handelProduct from './product/handelProduct'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
const dataState = createPersistedState({
  key: 'VueDate',
  paths: ['handelProduct']
})
export default new Vuex.Store({
  modules: { handelProduct },
  plugins: [dataState]
})

