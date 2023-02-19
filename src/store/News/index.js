const axios = require('axios');

export default {
  state: {
    singleNews: null,
    newsByUserId: null,
    newsByUserCity: null,
    todayNewsByUserCity: null,
    getNewsByCategoryId: null,
    getReportedNewsByUserId: null
  },
  getters: {
    getNewsById(state) {
      return state.singleNews;
    },
    getNewsByUserId(state) {
      return state.newsByUserId;
    },
    getNewsByUserCity(state) {
      return state.newsByUserCity;
    },
    getTodayNewsByUserCity(state) {
      return state.todayNewsByUserCity;
    },
    getNewsByCategoryId(state) {
      return state.getNewsByCategoryId;
    },
    getReportedNewsByUserId(state) {
      return state.getReportedNewsByUserId;
    }
  },
  actions: {
    async getNewsById({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/News/${payload}`)
        .then(function (response) {
          if (response.data.status) {
            commit('setNewsById', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getNewsByUserId({ commit }) {
      return await axios
        .get(
          `${
            process.env.VUE_APP_API_URL
          }api/News/GetNewsByUserId?id=${window.localStorage.getItem(
            'beAware-userId'
          )}`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setNewsByUserId', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getNewsByUserCity({ commit }) {
      return await axios
        .get(
          `${
            process.env.VUE_APP_API_URL
          }api/News/GetNewsByUserCity?id=${window.localStorage.getItem(
            'beAware-userId'
          )}`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setNewsByUserCity', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getTodayNewsByUserCity({ commit }) {
      return await axios
        .get(
          `${
            process.env.VUE_APP_API_URL
          }api/News/getTodayNewsByUserCity?id=${window.localStorage.getItem(
            'beAware-userId'
          )}`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setNewsByUserCity', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getNewsByCategoryId({ commit }, payload) {
      return await axios
        .get(
          `${process.env.VUE_APP_API_URL}api/News/GetNewsByCategoryId?id=${payload}`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setNewsByCategoryId', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getReportedNewsByUserId({ commit }, payload) {
      return await axios
        .get(
          `${process.env.VUE_APP_API_URL}api/News/GetReportedNewsByUserId?id=${payload}`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setReportedNewsByUserId', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async addNews({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/News`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async reportUser({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/News/ReportNews`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async editNews({ commit }, payload) {
      return await axios
        .put(`${process.env.VUE_APP_API_URL}api/News`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async delNews({ commit }, payload) {
      return await axios
        .delete(`${process.env.VUE_APP_API_URL}api/News/${payload}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  mutations: {
    setNewsById(state, response) {
      state.singleNews = response.data;
    },
    setNewsByUserId(state, response) {
      state.newsByUserId = response.data;
    },
    setNewsByUserCity(state, response) {
      state.newsByUserCity = response.data;
    },
    setTodayNewsByUserCity(state, response) {
      state.todayNewsByUserCity = response.data;
    },
    setNewsByCategoryId(state, response) {
      state.getNewsByCategoryId = response.data;
    },
    setReportedNewsByUserId(state, response) {
      state.getReportedNewsByUserId = response.data;
    }
  }
};
