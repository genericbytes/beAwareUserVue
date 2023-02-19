<template>
  <div style="padding-top: 10%;">
    <div class="container container-xl-custom">
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
        <div class="row mt-5 pt-3">
          <div class="col-12">
            <div class="blog-posts">
              <template v-for="item in newsList">
                <article class="post post-large" :key="item.id">
                  <div class="post-image">
                    <router-link :to="'/news/' + item.id.toString()">
                      <img
                        :src="item.image"
                        class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0"
                        style="width:100% !important"s
                        :alt="item.title"
                      />
                    </router-link>
                  </div>

                  <div class="post-date text-1">
                    <span class="day border-radius-0 text-4 text-dark">{{
                      new Date(item.createdDateTime).getDate()
                    }}</span>
                    <span class="month border-radius-0 text-1 bg-color-dark">{{
                      month[new Date(item.createdDateTime).getMonth()]
                    }}</span>
                  </div>

                  <div class="post-content">
                    <h2 class="font-weight-semibold text-6 line-height-3 mb-3">
                      <router-link
                        :to="'/news/' + item.id.toString()"
                        class="text-color-dark text-color-hover-primary"
                        >{{ item.title }}</router-link
                      >
                    </h2>
                    <p>
                      {{ item.description }}
                    </p>

                    <div class="post-meta">
                      <span
                        ><i class="far fa-user"></i> By
                        <a href="">{{ item.fullName }}</a>
                      </span>
                      <span
                        ><i class="far fa-folder"></i>
                        <a href="">{{ item.categoryName }}</a>
                      </span>
                      <span
                        class="d-block d-sm-inline-block float-sm-end mt-3 mt-sm-0"
                        ><router-link
                          :to="'/news/' + item.id.toString()"
                          class="btn btn-xs btn-light text-1 text-uppercase"
                          >Read More</router-link
                        ></span
                      >
                    </div>
                  </div>
                </article>
              </template>

              <!-- <ul class="pagination float-end">
                <li class="page-item">
                  <a class="page-link" href="#"
                    ><i class="fas fa-angle-left"></i
                  ></a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#"
                    ><i class="fas fa-angle-right"></i
                  ></a>
                </li>
              </ul> -->
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
      categoryId: 0,
      newsList: null,
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
    async getAllNewsByCategoryId(categoryId) {
      await this.$store
        .dispatch("getNewsByCategoryId", categoryId)
        .then((response) => {
          debugger;
          if (!response.data.status) {
            swal({
              text: response.data.message,
              icon: "error",
            });
          } else {
            this.newsList = this.getNewsByCategoryId;
          }
        });
    },

    async getAllTodayNewsByUserCity() {
      await this.$store.dispatch("getNewsByUserCity").then((response) => {
        if (!response.data.status) {
          swal({
            text: response.data.message,
            icon: "error",
          });
        } else {
          this.latestNews =
            this.getTodayNewsByUserCity === null
              ? this.getNewsByUserCity
              : this.getTodayNewsByUserCity;
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
    debugger;
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        this.categoryId = this.$route.params.id;
        this.getAllNewsByCategoryId(this.categoryId).then(() => {});
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getNewsByCategoryId"]),
  },
  watch: {
    "$route.params.id": {
      handler: function (newValue, oldValue) {
        debugger;
        if (newValue !== oldValue) {
          this.handleIsAuthenticated().then(() => {
            if (this.isAuthenticated) {
              this.categoryId = this.$route.params.id;
              this.getAllNewsByCategoryId(this.categoryId).then(() => {});
            }
          });
        }
      },
    },
  },
};
</script>
