<template>
  <div style="padding-top: 10%;">
    <div class="container py-4">
      <div class="row justify-content-center">
        <h2 class="font-weight-bold text-5 text-center mb-0">Register</h2>
        <div class="col-12 mb-5 mb-lg-0">
          <form ref="signUpForm">
            <div class="row">
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >First Name <span class="text-color-danger">*</span></label
                >
                <input
                  type="text"
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
                  type="password"
                  v-model="formData.password"
                  placeholder="Password"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-12">
                <label class="form-label text-color-dark text-3"
                  >Confrim Password
                  <span class="text-color-danger">*</span></label
                >
                <input
                  type="password"
                  v-model="formData.confrimPassword"
                  placeholder="Confrim Password"
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
                  v-model="formData.dOB"
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
                  v-model="formData.city"
                  class="form-control form-control-lg text-4"
                  required
                >
                  <template v-for="item in this.city">
                    <option :value="item.name">{{ item.name }}</option>
                  </template>
                </select>
              </div>
              <div class="col-12">
                <p class="text-2 mb-2">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our
                  <a href="#" class="text-decoration-none">privacy policy.</a>
                </p>
              </div>
              <div class="col-12">
                <button
                  type="button"
                  @click="signUp"
                  class="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                >
                  Register
                </button>
              </div>
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
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confrimPassword: "",
        phoneNumber: "",
        dOB: "",
        country: "",
        state: "",
        city: "",
      },
      countries: null,
      state: null,
      city: null,
    };
  },

  methods: {
    async signUp(event) {
      event.preventDefault();
      await this.$store.dispatch("signUp", this.formData).then((response) => {
        if (response.data.status) {
          swal({
            text: response.data.message,
            icon: "success",
          });
          this.$refs.signUpForm.reset();
          this.$router.push({ name: "signin" });
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
  },

  mounted() {
    this.getCountryList().then(() => {
      this.countries = this.getCountries;
      this.getStateByCountry().then(() => {
        this.state = this.getState;
        this.getCitiesByState().then(() => {
        this.city = this.getCities
      })
      })
    });
  },

  computed: {
    ...mapGetters(["getCountries", "getState", "getCities"]),
  },
};
</script>
