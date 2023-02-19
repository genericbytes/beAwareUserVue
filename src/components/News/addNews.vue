<template>
  <div class="col-12">
    <div class="row">
      <div class="tab-pane tab-pane-navigation active" id="formsStyleDefault">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <form class="contact-form" ref="newsForm">
                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12">
                      <div class="row">
                        <div class="form-group col-lg-12">
                          <div class="d-flex justify-content-center mb-4">
                            <div class="profile-image-outer-container">
                              <div
                                class="profile-image-inner-container bg-color-primary"
                              >
                                <img
                                  :src="
                                    imageURL === null
                                      ? '/assets/img/avatars/avatar.jpg'
                                      : imageURL
                                  "
                                  :alt="formData.title"
                                />
                                <span
                                  class="profile-image-button bg-color-dark"
                                >
                                  <i class="fas fa-camera text-light"></i>
                                </span>
                              </div>
                              <input
                                @change="previewImage"
                                type="file"
                                accept="image/png, image/jpeg, image/bmp"
                                class="form-control profile-image-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12">
                      <div class="row">
                        <div class="form-group col-lg-12">
                          <label for="Title" class="form-label mb-1 text-2"
                            >Title</label
                          >
                          <input
                            type="text"
                            v-model="formData.title"
                            data-msg-required="Title"
                            maxlength="100"
                            class="form-control text-3 h-auto py-2"
                            name="Title"
                            required
                          />
                        </div>
                        <div class="form-group col-lg-6 col-sm-12">
                          <label for="Category" class="form-label"
                            >Categories</label
                          >
                          <div class="custom-select-1">
                            <select
                              class="form-select form-control h-auto py-2"
                              data-msg-required="Please select a Category."
                              name="Category"
                              required
                              v-model="formData.categoryId"
                            >
                              <template v-for="item in this.categories">
                                <template
                                  v-if="
                                    item.name.toLowerCase() !==
                                    'LATEST'.toLowerCase()
                                  "
                                >
                                  <option :value="item.id">{{
                                    item.name
                                  }}</option>
                                </template>
                              </template>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-lg-6 col-sm-12">
                          <label for="Country" class="form-label"
                            >Country</label
                          >
                          <div class="custom-select-1">
                            <select
                              v-model="selectedCountry"
                              class="form-select form-control h-auto py-2"
                              data-msg-required="Please select a Country."
                              name="Country"
                              required
                              @change="getStateByCountry()"
                            >
                              <template v-for="item in this.countries">
                                <option :value="item.iso2">{{
                                  item.name
                                }}</option>
                              </template>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-lg-6 col-sm-12">
                          <label for="State" class="form-label">State</label>
                          <div class="custom-select-1">
                            <select
                              v-model="selectedState"
                              class="form-select form-control h-auto py-2"
                              data-msg-required="Please select a State."
                              name="State"
                              required
                              @change="getCitiesByState()"
                            >
                              <template v-for="item in this.states">
                                <option :value="item.iso2">{{
                                  item.name
                                }}</option>
                              </template>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-lg-6 col-sm-12">
                          <label for="City" class="form-label">City</label>
                          <div class="custom-select-1">
                            <select
                              v-model="formData.cityName"
                              class="form-select form-control h-auto py-2"
                              data-msg-required="Please select a city."
                              name="city"
                              required
                            >
                              <template v-for="item in this.cities">
                                <option :value="item.name">{{
                                  item.name
                                }}</option>
                              </template>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-lg-12 col-sm-12">
                          <label
                            for="description"
                            class="form-label mb-1 text-2"
                            >Message</label
                          >
                          <textarea
                            v-model="formData.description"
                            maxlength="2500"
                            data-msg-required="Description."
                            rows="10"
                            class="form-control text-3 h-auto py-2"
                            name="description"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div class="form-group col-sm-12">
                        <input
                          type="button"
                          value="Save"
                          class="btn btn-primary"
                          @click="submitNews"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        id: 0,
        title: "",
        image: "",
        description: "",
        countryName: "",
        stateName: "",
        cityName: "",
        categoryId: 0,
        userId: 0,
      },
      imageURL: null,
      categories: null,
      countries: null,
      states: null,
      cities: null,
      selectedCountry: "",
      selectedState: "",
    };
  },

  methods: {
    async getAllCategories() {
      await this.$store.dispatch("getCategories").then((response) => {
        if (!response.data.status) {
          swal({
            text: response.data.message,
            icon: "error",
          });
        }
      });
    },
    async getCountryList() {
      await this.$store.dispatch("getCountries");
    },

    async getStateByCountry() {
      await this.$store
        .dispatch("getStateByCountry", this.selectedCountry)
        .then(() => {
          this.states = this.getState;
        });
    },

    async getCitiesByState() {
      var payload = {
        country: this.selectedCountry,
        state: this.selectedState,
      };
      await this.$store.dispatch("getCitiesByState", payload).then(() => {
        this.cities = this.getCities;
      });
    },

    previewImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.formData.image = rawImg;
        this.imageURL = rawImg;
      };
      reader.readAsDataURL(file);
    },

    async submitNews(event) {
      event.preventDefault();
      if (this.formData.id === null || this.formData.id === 0) {
        this.addnews(event);
      } else {
        this.editnews(event);
      }
    },

    async addnews(event) {
      event.preventDefault();
      await this.$store.dispatch("addNews", this.formData).then((response) => {
        if (response.data.status) {
          this.formData = {
            id: 0,
            title: "",
            image: "",
            description: "",
            countryName: "",
            stateName: "",
            cityName: "",
            categoryId: 0,
          };
          swal({
            text: response.data.message,
            icon: "success",
          });
        } else {
          swal({
            text: response.data.message,
            icon: "error",
          });
        }
      });
    },

    async editnews(event) {
      event.preventDefault();
      await this.$store.dispatch("editNews", this.formData).then((response) => {
        if (response.data.status) {
          this.formData = {
            id: 0,
            title: "",
            image: "",
            description: "",
            countryName: "",
            stateName: "",
            cityName: "",
            categoryId: 0,
          };
          this.$emit("closeIt");
          swal({
            text: response.data.message,
            icon: "success",
          });
        } else {
          swal({
            text: response.data.message,
            icon: "error",
          });
        }
      });
    },
  },
  mounted() {
    this.getAllCategories().then(() => {
      this.categories = this.getCategories;
    });

    if (this.getNewsById) {
      this.formData = this.getNewsById;
      this.imageURL = this.getNewsById.image;
      this.getCountryList().then(() => {
        this.countries = this.getCountries;
        this.getStateByCountry().then(() => {
          this.getCitiesByState();
        });
      });
      this.selectedCountry = this.getNewsById.countryName;
      this.selectedState = this.getNewsById.stateName;
    } else {
      this.getCountryList().then(() => {
        this.countries = this.getCountries;
      });
      this.formData.userId = parseInt(
        window.localStorage.getItem("beAware-userId"),
      );
    }
  },
  computed: {
    ...mapGetters([
      "getNewsById",
      "getCategories",
      "getCountries",
      "getState",
      "getCities",
    ]),
  },
};
</script>
