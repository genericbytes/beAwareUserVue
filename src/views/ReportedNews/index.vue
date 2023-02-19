<template>
  <section class="card card-admin mt-3">
    <div class="bg-dark p-5 rounded">
      <h1 class="text-white">My Reported News</h1>
      <p class="lead">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
    <div class="card-body">
      <div>
        <b-table striped hover :items="getReportedNews" :fields="fields">
          <template #cell(createdDateTime)="data">
            {{ new Date(data.item.createdDateTime).toLocaleString() }}
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>
<script>
import swal from "sweetalert";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
        },
        {
          key: "reason",
          label: "Reason",
          sortable: true,
        },
        {
          key: "createdDateTime",
          label: "Reported Date & Time",
          sortable: true,
        },
      ],
      userId: 0,
      getReportedNews: null,
    };
  },
  methods: {
    async getAllReportedNews(userId) {
      await this.$store
        .dispatch("getReportedNewsByUserId", userId)
        .then((response) => {
          if (!response.data.status) {
            swal({
              text: response.data.message,
              icon: "error",
            });
          } else {
            this.getReportedNews = this.getReportedNewsByUserId;
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
        this.userId = parseInt(window.localStorage.getItem("beAware-userId"));
        this.getAllReportedNews(this.userId).then(() => {});
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getReportedNewsByUserId"]),
  },
};
</script>
