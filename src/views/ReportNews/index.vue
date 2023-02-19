<template>
  <form>
    <div class="form-group col-lg-12 col-sm-12">
      <label for="reason" class="form-label mb-1 text-2">Reason</label>
      <textarea
        v-model="formData.reason"
        maxlength="2500"
        data-msg-required="Description."
        rows="10"
        class="form-control text-3 h-auto py-2"
        name="description"
        required
      ></textarea>
    </div>
    <div class="form-group col-sm-12">
      <input
        type="button"
        value="Save"
        class="btn btn-primary"
        @click="reportNews"
      />
    </div>
  </form>
</template>
<script>
import swal from "sweetalert";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        reason: "",
        newsId: 0,
        userId: 0,
      },
      isAuthenticated: false,
    };
  },
  methods: {
    async getSingleNewsById(newsId) {
      await this.$store.dispatch("getNewsById", newsId).then((response) => {
        debugger;
        if (!response.data.status) {
          swal({
            text: response.data.message,
            icon: "error",
          });
        } else {
          this.singelNews = this.getNewsById;
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
    async reportNews() {
      event.preventDefault();
      await this.$store
        .dispatch("reportUser", this.formData)
        .then((response) => {
          if (response.data.status) {
            this.formData = {
                reason: "",
                newsId: 0,
                userId: 0
            };
            swal({
              text: response.data.message,
              icon: "success",
            });
            this.$router.push({ name: 'home' });
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
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        this.formData.newsId = parseInt(this.$route.params.id);
        this.formData.userId = parseInt(
          window.localStorage.getItem("beAware-userId"),
        );
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getNewsById"]),
  },
};
</script>
