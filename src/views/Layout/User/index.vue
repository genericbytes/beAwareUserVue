<template>
  <div>
    <header id="header">
      <div class="header-body border-0">
        <div
          class="header-container container container-xl-custom"
          style="min-height: 122px;"
        >
          <div class="header-row py-3">
            <div class="header-column justify-content-start">
              <div class="header-row">
                <h1 class="header-logo">
                  <router-link to="/">
                    <img
                      alt="BeAware"
                      width="100"
                      height="100"
                      src="/assets/img/logo-default-slim.png"
                    />
                    <span class="hide-text">BeAware</span>
                  </router-link>
                </h1>
              </div>
            </div>
            <div class="header-column justify-content-end w-75">
              <div class="header-row">
                <router-link to="/">
                  <img
                    alt="BeAware"
                    class="img-fluid ps-3"
                    src="/assets/img/blog/blog-ad-2.jpg"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="header-nav-bar header-nav-bar-top-border bg-light">
          <div class="header-container container container-xl-custom">
            <div class="header-row">
              <div class="header-column">
                <div
                  class="header-row justify-content-end justify-content-lg-start"
                >
                  <div class="header-nav p-0">
                    <div
                      class="header-nav header-nav-links header-nav-spaced header-nav-first-item-no-padding justify-content-start"
                    >
                      <div
                        class="header-nav-main header-nav-main-square header-nav-main-font-lg-upper header-nav-main-dropdown-no-borders header-nav-main-effect-2 header-nav-main-sub-effect-1"
                      >
                        <nav class="collapse">
                          <ul
                            class="nav nav-pills flex-column flex-lg-row"
                            id="mainNav"
                          >
                            <li class="dropdown ms-0">
                              <router-link
                                to="/"
                                class="dropdown-item dropdown-toggle active"
                              >
                                Home
                              </router-link>
                            </li>
                            <template v-for="item in this.categories">
                              <li
                                class="dropdown dropdown-mega"
                                :key="item.name"
                              >
                                <router-link
                                  :to="
                                    '/category/' +
                                    item.name.toLowerCase() +
                                    '/' +
                                    item.id.toString()
                                  "
                                  class="dropdown-item dropdown-toggle"
                                >
                                  {{ item.name.toUpperCase() }}
                                </router-link>
                              </li>
                            </template>
                            <template v-if="!getIsAuthenticated">
                              <li class="dropdown d-flex">
                                <router-link
                                  to="/signin"
                                  class="dropdown-item dropdown-toggle"
                                >
                                  Sign In
                                </router-link>
                              </li>
                              <li class="dropdown d-flex">
                                <router-link
                                  to="/signup"
                                  class="dropdown-item dropdown-toggle"
                                >
                                  Sign Up
                                </router-link>
                              </li>
                            </template>
                            <template v-else>
                              <li class="dropdown d-flex">
                                <router-link
                                  to="/dashboard"
                                  class="dropdown-item dropdown-toggle"
                                >
                                  Account
                                </router-link>
                              </li>
                              <li class="dropdown d-flex">
                                <a
                                  @click="logOut()"
                                  class="dropdown-item dropdown-toggle"
                                  href=""
                                >
                                  Log Out
                                </a>
                              </li>
                            </template>
                          </ul>
                        </nav>
                      </div>
                      <button
                        class="btn header-btn-collapse-nav"
                        data-bs-toggle="collapse"
                        data-bs-target=".header-nav-main nav"
                      >
                        <i class="fas fa-bars"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-nav-features header-nav-features-no-border p-static">
        <div
          class="header-nav-feature header-nav-features-search header-nav-features-search-reveal header-nav-features-search-reveal-big-search header-nav-features-search-reveal-big-search-full"
        >
          <div class="container">
            <div class="row h-100 d-flex">
              <div class="col h-100 d-flex">
                <form
                  role="search"
                  class="d-flex h-100 w-100"
                  action="page-search-results.html"
                  method="get"
                >
                  <div class="big-search-header input-group">
                    <input
                      class="form-control text-1"
                      id="headerSearch"
                      name="q"
                      type="search"
                      value=""
                      placeholder="Type and hit enter..."
                    />
                    <a href="#" class="header-nav-features-search-hide-icon"
                      ><i class="fas fa-times header-nav-top-icon"></i
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div role="main" class="main">
      <router-view />
    </div>

    <footer id="footer">
      <div class="container container-xl-custom">
        <div class="footer-ribbon">
          <span>Get in Touch</span>
        </div>
        <div class="row py-5 my-4">
          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <h5 class="text-3 mb-3">ABOUT THE BLOG</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
              pulvinar magna semper scelerisque.
            </p>
            <p class="mb-2">
              Praesent venenatis turpis vitae purus semper, eget sagittis velit
              venenatis ptent taciti sociosqu ad litora...
            </p>
            <p class="mb-0">
              <router-link
                to="/"
                class="btn-flat btn-xs text-color-light p-relative top-5"
                ><strong class="text-2">VIEW MORE</strong
                ><i class="fas fa-angle-right p-relative top-1 ps-2"></i
              ></router-link>
            </p>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0"></div>
          <div class="col-md-6 col-lg-3 mb-5 mb-md-0"></div>
          <div class="col-md-6 col-lg-2">
            <h5 class="text-3 mb-3">CATEGORIES</h5>
            <p>
              <template v-for="item in this.categories">
                <router-link
                  :to="
                    '/category/' +
                    item.name.toLowerCase() +
                    '/' +
                    item.id.toString()
                  "
                >
                  <span
                    :key="item.name"
                    class="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase"
                    >{{ item.name.toUpperCase() }}</span
                  >
                </router-link>
              </template>
            </p>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container container-xl-custom py-2">
          <div class="row py-4">
            <div
              class="col-lg-1 d-flex align-items-center justify-content-center justify-content-lg-start mb-2 mb-lg-0"
            >
              <a href="index.html" class="logo pe-0 pe-lg-3">
                <img
                  alt="Porto Website Template"
                  src="/assets/img/logo-footer.png"
                  class="opacity-5"
                  height="32"
                />
              </a>
            </div>
            <div
              class="col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0"
            >
              <p>© Copyright 2022. All Rights Reserved.</p>
            </div>
            <div
              class="col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-end"
            >
              <nav id="sub-menu">
                <ul>
                  <li>
                    <i class="fas fa-angle-right"></i
                    ><a href="" class="ms-1 text-decoration-none"> FAQ's</a>
                  </li>
                  <li>
                    <i class="fas fa-angle-right"></i
                    ><a href="" class="ms-1 text-decoration-none"> Sitemap</a>
                  </li>
                  <li>
                    <i class="fas fa-angle-right"></i
                    ><a href="" class="ms-1 text-decoration-none">
                      Contact Us</a
                    >
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import swal from "sweetalert";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isAuthentication: false,
      categories: null,
      newsList: null,
    };
  },
  methods: {
    getIsLoggedInBeAware() {
      this.isAuthentication = window.localStorage.getItem("isLoggedInBeAware");
    },

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

    logOut() {
      window.localStorage.removeItem("isLoggedInBeAware");
      window.localStorage.removeItem("beAware-userId");
      this.$store.dispatch("handleIsAuthenticated", false);
      this.isAuthentication = false;
      this.$router.push("/");
    },
  },
  mounted() {
    // this.getIsLoggedInBeAware();
    this.getAllCategories().then(() => {
      this.categories = this.getCategories;
    });
  },
  computed: {
    ...mapGetters(["getCategories", "getIsAuthenticated"]),
  },
};
</script>

<style></style>
