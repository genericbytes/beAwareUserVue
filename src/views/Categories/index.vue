<template>
  <div class="col-12">
    <div class="row">
      <div class="bg-dark p-5 rounded">
        <h1 class="text-white">Request Category</h1>
        <p class="lead">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div class="tab-pane tab-pane-navigation active" id="formsStyleDefault">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <form class="contact-form" ref="newsForm">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <div class="row">
                        <div class="form-group col-lg-12">
                          <label for="name" class="form-label mb-1 text-2"
                            >Category Name</label
                          >
                          <input
                            type="text"
                            v-model="formData.name"
                            data-msg-required="name"
                            maxlength="100"
                            class="form-control text-3 h-auto py-2"
                            name="name"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group col-sm-12">
                        <input
                          type="button"
                          value="Send Request"
                          class="btn btn-primary"
                          @click="sendCategoryRequest"
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
        name: "",
        userId: 0,
      },
      isAuthenticated: false,
    };
  },

  methods: {
    async sendCategoryRequest(event) {
      event.preventDefault();
      await this.$store.dispatch("sendCategoryRequest", this.formData).then((response) => {
        if (response.data.status) {
          this.formData = {
            name: "",
            userId: 0,
          };
          this.$router.push({ name: 'home' });
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

    async handleIsAuthenticated() {
      await this.$store
        .dispatch(
          "handleIsAuthenticated",
          window.localStorage.getItem("isLoggedInBeAware"),
        )
        .then(() => {
          this.isAuthenticated =
            this.getIsAuthenticated === null ? false : this.getIsAuthenticated;
        });
    },
  },
  mounted() {
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        this.formData.userId = parseInt(
          window.localStorage.getItem("beAware-userId"),
        );
      }
    });
  },
  computed: {
    ...mapGetters([
      "getIsAuthenticated",
    ]),
  },
};
</script>
