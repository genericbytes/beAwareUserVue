var localStorageMixin = {
  created: function () {
    this.getData(key);
    this.saveData(key, data);
    this.destroyData(key);
  },
  methods: {
    getData: function (key) {
      return window.localStorage.getItem(key);
    },

    saveData: function (key, data) {
      window.localStorage.setItem(key, data);
    },
    destroyData: function (key) {
      window.localStorage.removeItem(key);
    }
  }
};
