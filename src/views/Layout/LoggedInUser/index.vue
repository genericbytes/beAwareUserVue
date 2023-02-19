<template>
  <div>
    <main class="d-flex">
      <div
        class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style="width: 250px; height: calc(100vh + 100px);"
      >
        <router-link
          to="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-4">BeAware</span>
        </router-link>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="dashboard" class="nav-link text-white" active-class="active">
              My News
            </router-link>
          </li>
          <li>
            <router-link to="addNews" class="nav-link text-white" active-class="active">
              Add News
            </router-link>
          </li>
          <li>
            <router-link to="/reportedNews" class="nav-link text-white" active-class="active">
              Reported News
            </router-link>
          </li>
          <li>
            <router-link to="/requestCategory" class="nav-link text-white" active-class="active">
              Request Category
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="nav-link text-white" active-class="active">
              Profile
            </router-link>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              class="rounded-circle me-2"
              width="32"
              height="32"
            />
            <strong>mdo</strong>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <router-link to="/profile" class="dropdown-item"
                >Profile</router-link
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" logOut href="">Sign out</a></li>
          </ul>
        </div>
      </div>
      <div
        class="d-flex flex-column flex-shrink-0 p-3"
        style="width: calc(100% - 250px);"
      >
        <router-view />
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAuthentication: false,
    };
  },
  methods: {
    getIsLoggedInBeAware() {
      this.isAuthentication = window.localStorage.getItem("isLoggedInBeAware");
    },

    logOut() {
      window.localStorage.removeItem("isLoggedInBeAware");
      this.isAuthentication = false;
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    this.getIsLoggedInBeAware();
  },
};
</script>
