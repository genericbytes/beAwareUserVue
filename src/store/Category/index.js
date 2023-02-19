const axios = require('axios');

export default {
  state: {
    categories: null
  },
  getters: {
    getCategories(state) {
      return state.categories;
    }
  },
  actions: {
    async getCategories({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/Category`)
        .then(function (response) {
          if (response.data.status) {
            commit('setCategories', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async sendCategoryRequest({ commit }, payload) {
      debugger;
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/Category/RequestCategory`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mutations: {
    setCategories(state, response) {
      state.categories = response.data;
    }
  }
};
