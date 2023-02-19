<template>
  <div style="padding-top: 10%;">
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5 mb-5 mb-lg-0">
          <h2 class="font-weight-bold text-5 mb-0">Login</h2>
          <form class="needs-validation" ref="signInForm">
            <div class="row">
              <div class="form-group col">
                <label class="form-label text-color-dark text-3"
                  >Email address <span class="text-color-danger">*</span></label
                >
                <input
                  type="email"
                  v-model="formData.email"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col">
                <label class="form-label text-color-dark text-3"
                  >Password <span class="text-color-danger">*</span></label
                >
                <input
                  type="password"
                  v-model="formData.password"
                  class="form-control form-control-lg text-4"
                  required
                />
              </div>
            </div>
            <div class="row justify-content-between">
              <div class="form-group col-md-auto"></div>
              <div class="form-group col-md-auto">
                <a
                  class="text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                  href="#"
                  >Forgot Password?</a
                >
              </div>
            </div>
            <div class="row">
              <div class="form-group col">
                <button
                  type="button"
                  @click="login"
                  class="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6 col-lg-5">
          <img
            src="/assets/img/Login.jpg"
            alt="Account"
            class="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async login(event) {
      event.preventDefault();
      await this.$store.dispatch("signIn", this.formData).then((response) => {
        if (response.data.status) {
          swal({
            text: response.data.message,
            icon: "success",
          });
          this.$refs.signInForm.reset();
          this.$router.push({ name: "home" });
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
