<template>
  <div style="padding-top: 10%;">
    <div v-if="!this.isAuthenticated">
      <div class="col-12">
        <div class="row">
          <div class="container">
            <div class="col-12">
              <div class="http-error-main text-center my-5">
                <h2>401!</h2>
                <p>We're sorry, but you have to login first.</p>
                <router-link
                  to="/signin"
                  class="btn btn-modern btn-primary rounded-0 mb-2"
                  >Sign In</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container py-4">
        <div class="row">
          <div class="col">
            <div class="d-flex justify-content-between">
              <button @click="previousNews" class="btn btn-tertiary my-5">
                Previous
              </button>
              <button @click="nextNews" class="btn btn-tertiary my-5">
                Next
              </button>
            </div>
            <div
              class="blog-posts single-post appear-animation animated fadeInDown appear-animation-visible"
              data-appear-animation="fadeInDown"
              data-appear-animation-delay="0"
              data-appear-animation-duration="1s"
            >
              <article
                class="post post-large blog-single-post border-0 m-0 p-0"
              >
                <div class="post-image ms-0">
                  <img
                    :src="singelNews.image"
                    class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0"
                    style="width: 100% !important;"
                    :alt="singelNews.title"
                  />
                </div>

                <div class="post-date ms-0">
                  <span class="day">{{
                    new Date(singelNews.createdDateTime).getDate()
                  }}</span>
                  <span class="month">{{
                    month[new Date(singelNews.createdDateTime).getMonth()]
                  }}</span>
                </div>

                <div class="post-content ms-0">
                  <h2 class="font-weight-semi-bold">
                    {{ singelNews.title }}
                  </h2>

                  <div class="post-meta">
                    <span
                      ><i class="far fa-user"></i> By
                      <a href="">{{ singelNews.fullName }}</a>
                    </span>
                    <span
                      ><i class="far fa-folder"></i>
                      <a href="">{{ singelNews.categoryName }}</a
                      >,
                    </span>
                  </div>

                  <p>
                    {{ singelNews.description }}
                  </p>
                </div>
              </article>
              <router-link :to="'/reportNews/' + singelNews.id.toString()">
                <button class="btn btn-secondary" style="cursor: pointer;">
                  Report News
                </button>
              </router-link>
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
      newsId: 0,
      singelNews: null,
      newsList: [],
      isAuthenticated: false,
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  methods: {
    async getSingleNewsById(newsId) {
      await this.$store.dispatch("getNewsById", newsId).then((response) => {
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

    async nextNews() {
      const index = this.newsList.findIndex((x) => x.id == this.newsId);
      if (index === -1 || index === this.newsList.length - 1) {
        return null;
      }
      this.newsId = this.newsList[index + 1].id;
      return (this.singelNews = this.newsList[index + 1]);
    },

    async previousNews() {
      const index = this.newsList.findIndex((x) => x.id == this.newsId);
      if (index === this.newsList.length - 1) {
        this.newsId = this.newsList[index - 1].id;
        return (this.singelNews = this.newsList[index - 1]);
      } else if (index >= 0) {
        this.newsId = this.newsList[index - 1].id;
        return (this.singelNews = this.newsList[index - 1]);
      }
    },

    async getAllNewsByUserCity() {
      await this.$store.dispatch("getNewsByUserCity").then((response) => {
        if (!response.data.status) {
          swal({
            text: response.data.message,
            icon: "error",
          });
        } else {
          this.newsList = this.getNewsByUserCity;
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
      this.newsId = this.$route.params.id;
      if (this.isAuthenticated) {
        this.newsId = this.$route.params.id;
        this.getSingleNewsById(this.newsId).then(() => {});
        this.getAllNewsByUserCity().then(() => {});
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getNewsById", "getNewsByUserCity"]),
  },
};
</script>
