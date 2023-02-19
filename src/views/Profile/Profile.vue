<template>
  <div>
    <div class="container py-4">
      <div class="row justify-content-center">
        <h2 class="font-weight-bold text-5 text-center mb-0">Profile</h2>
        <div class="col-12 mb-5 mb-lg-0">
          <form ref="signUpForm">
            <div class="row">
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >First Name <span class="text-color-danger">*</span></label
                >
                <input
                  type="text"
                  :disabled="isDisabled"
                  v-model="formData.firstName"
                  placeholder="First Name"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Last Name <span class="text-color-danger">*</span></label
                >
                <input
                  type="text"
                  :disabled="isDisabled"
                  v-model="formData.lastName"
                  placeholder="Last Name"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Username <span class="text-color-danger">*</span></label
                >
                <input
                  type="text"
                  :disabled="isDisabled"
                  v-model="formData.userName"
                  placeholder="Username"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Email <span class="text-color-danger">*</span></label
                >
                <input
                  type="email"
                  :disabled="isDisabled"
                  v-model="formData.email"
                  placeholder="Email"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Password <span class="text-color-danger">*</span></label
                >
                <input
                  disabled
                  type="password"
                  v-model="formData.password"
                  placeholder="Password"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Phone Number <span class="text-color-danger">*</span></label
                >
                <input
                  type="text"
                  :disabled="isDisabled"
                  v-model="formData.phoneNumber"
                  placeholder="Phone Number"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Date of Birth <span class="text-color-danger">*</span></label
                >
                <input
                  type="date"
                  :disabled="isDisabled"
                  v-model="formData.dob"
                  placeholder="Date of Birth"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Country <span class="text-color-danger">*</span></label
                >
                <select
                  :disabled="isDisabled"
                  v-model="formData.country"
                  class="form-control form-control-lg text-4"
                  required
                  @change="getStateByCountry(formData.country)"
                >
                  <template v-for="item in this.countries">
                    <option :value="item.iso2">{{ item.name }}</option>
                  </template>
                </select>
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >State <span class="text-color-danger">*</span></label
                >
                <select
                  :disabled="isDisabled"
                  v-model="formData.state"
                  class="form-control form-control-lg text-4"
                  required
                  @change="getCitiesByState(formData.state)"
                >
                  <template v-for="item in this.state">
                    <option :value="item.iso2">{{ item.name }}</option>
                  </template>
                </select>
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >City <span class="text-color-danger">*</span></label
                >
                <select
                  :disabled="isDisabled"
                  v-model="formData.city"
                  class="form-control form-control-lg text-4"
                  required
                >
                  <template v-for="item in this.city">
                    <option :value="item.name">{{ item.name }}</option>
                  </template>
                </select>
              </div>
              <template v-if="!isDisabled">
                <div class="col-12 mt-2">
                  <div class="row">
                    <div class="col-6">
                      <button
                        type="button"
                        @click="updateProfile"
                        class="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                      >
                        Update Profile
                      </button>
                    </div>
                    <div class="col-6">
                      <button
                        type="button"
                        @click="cancelEditProfile"
                        class="btn btn-light btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="col-12 mt-2">
                  <button
                    type="button"
                    @click="editProfile"
                    class="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                  >
                    Edit Profile
                  </button>
                </div>
              </template>
            </div>
          </form>
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
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        dob: "",
        country: "",
        state: "",
        city: "",
      },
      isDisabled: true,
      countries: null,
      state: null,
      city: null,
    };
  },

  computed: {
    ...mapGetters([
      "getLoggedInUserData",
      "getCountries",
      "getState",
      "getCities",
    ]),
  },

  mounted() {
    this.getUserbyId();
    this.getCountryList().then(() => {
      this.countries = this.getCountries;
      this.countries = this.getCountries;
      this.getStateByCountry().then(() => {
        this.state = this.getState;
        this.getCitiesByState().then(() => {
          this.city = this.getCities;
        });
      });
    });
  },

  methods: {
    async updateProfile() {
      await this.$store
        .dispatch("updateProfile", this.formData)
        .then((response) => {
          if (response.data.status) {
            swal({
              text: "Profile Updated!",
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

    async getCountryList() {
      await this.$store.dispatch("getCountries");
    },

    async getStateByCountry() {
      await this.$store
        .dispatch("getStateByCountry", this.formData.country)
        .then(() => {
          this.state = this.getState;
        });
    },

    async getCitiesByState() {
      var payload = {
        country: this.formData.country,
        state: this.formData.state,
      };
      await this.$store.dispatch("getCitiesByState", payload).then(() => {
        this.city = this.getCities;
      });
    },

    editProfile() {
      this.isDisabled = false;
    },

    cancelEditProfile() {
      this.isDisabled = true;
    },

    async getUserbyId() {
      await this.$store.dispatch("getUserById").then((response) => {
        if (response.data.status) {
          this.formData = this.getLoggedInUserData;
        } else {
          swal({
            text: response.data.message,
            icon: "error",
          });
        }
      });
    },
  },
};
</script>
