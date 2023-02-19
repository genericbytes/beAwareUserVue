const axios = require('axios');

export default {
  state: {
    user: null,
    isAuthenticated: false,
    countries: null,
    state: null,
    city: null
  },
  getters: {
    getLoggedInUserData(state) {
      return state.user;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getCountries(state) {
      return state.countries;
    },
    getState(state) {
      return state.state;
    },
    getCities(state) {
      return state.city;
    }
  },
  actions: {
    async getCountries({ commit }, payload) {
      return await axios
        .get(`https://api.countrystatecity.in/v1/countries`, {
          headers: {
            'X-CSCAPI-KEY':
              'RzdRMThieHRNU1Jvd0NhNGlLdnI5TjZDbzhaTDRsTnpVRWpJWEFoUw=='
          }
        })
        .then(function (response) {
          commit('setCountries', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async getStateByCountry({ commit }, payload) {
      return await axios
        .get(`https://api.countrystatecity.in/v1/countries/${payload}/states`, {
          headers: {
            'X-CSCAPI-KEY':
              'RzdRMThieHRNU1Jvd0NhNGlLdnI5TjZDbzhaTDRsTnpVRWpJWEFoUw=='
          }
        })
        .then(function (response) {
          commit('setStateByCountry', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async getCitiesByState({ commit }, payload) {
      return await axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${payload.country}/states/${payload.state}/cities`,
          {
            headers: {
              'X-CSCAPI-KEY':
                'RzdRMThieHRNU1Jvd0NhNGlLdnI5TjZDbzhaTDRsTnpVRWpJWEFoUw=='
            }
          }
        )
        .then(function (response) {
          commit('setCitiesByState', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async signUp({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/Account/SignUp`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async signIn({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/Account/Login`, payload)
        .then(function (response) {
          if (response.data.status) {
            commit('setIsAuthenticated', true);
            window.localStorage.setItem('isLoggedInBeAware', true);
            window.localStorage.setItem(
              'beAware-userId',
              response.data.data.id
            );
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async getUserById({ commit }, payload) {
      return await axios
        .get(
          `${process.env.VUE_APP_API_URL}api/User/${window.localStorage.getItem(
            'beAware-userId'
          )}`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setSignInUserData', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async updateProfile({ commit }, payload) {
      return await axios
        .put(`${process.env.VUE_APP_API_URL}api/User`, payload)
        .then(function (response) {
          commit('setSignInUserData', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async handleIsAuthenticated({ commit }, payload) {
      commit('setIsAuthenticated', payload);
      return payload;
    }
  },
  mutations: {
    setSignInUserData(state, response) {
      state.user = response.data;
    },
    setIsAuthenticated(state, response) {
      state.isAuthenticated = response;
    },
    setCountries(state, response) {
      state.countries = response;
    },
    setStateByCountry(state, response) {
      state.state = response;
    },
    setCitiesByState(state, response) {
      state.city = response;
    }
  }
};
