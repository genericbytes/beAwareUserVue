import Vue from 'vue';
import Vuex from 'vuex';
import account from './Account';
import category from './Category';
import news from './News';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    category,
    news
  }
});
