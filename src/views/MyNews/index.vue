<template>
  <div class="col-12">
    <div class="row">
      <div class="container-fluid">
        <div class="bg-dark p-5 rounded">
          <h1 class="text-white">My News</h1>
          <p class="lead">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <section class="card card-admin mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-3">
                  <router-link to="addNews" class="btn btn-primary">
                    Add News <i class="fas fa-plus"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <div>
              <b-table striped hover :items="items" :fields="fields">
                <template #table-colgroup="scope">
                  <col
                    v-for="field in scope.fields"
                    :key="field.key"
                    :style="{
                      width: field.key === 'description' ? '600px' : '200px',
                    }"
                  />
                </template>
                <template #cell(active)="data">
                  {{
                    data.item.active === true ? "Active" : "Blocked By Admin"
                  }}
                </template>
                <template #cell(createdDateTime)="data">
                  {{ new Date(data.item.createdDateTime).toLocaleString() }}
                </template>
                <template #cell(actions)="data">
                  <span v-if="data.item.active">
                    <span
                      role="button"
                      class="d-inline-block"
                      style="margin-right: 10px;"
                      ><i
                        v-b-modal.modal-edit
                        class="fa-solid fa-pen text-warning"
                        @click="editNews(data.item.id)"
                      ></i
                    ></span>
                    <span role="button" class="d-inline-block"
                      ><i
                        class="fa-solid fa-trash text-danger"
                        @click="deleteNews(data.item.id)"
                      ></i
                    ></span>
                  </span>
                  <span v-else>
                    <span role="button" class="d-inline-block"
                      ><i
                        class="fa-solid fa-trash text-danger"
                        @click="deleteNews(data.item.id)"
                      ></i
                    ></span>
                  </span>
                </template>
              </b-table>
            </div>
          </div>
        </section>

        <b-modal v-model="show" size="lg" title="Edit News">
          <div class="card mb-4 rounded">
            <div class="card-body bg-dark">
              <h1 class="text-white mb-0">Edit News</h1>
            </div>
          </div>
          <news @closeIt="closeModel"></news>
          <template #modal-footer>
            <div class="w-100"></div>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import { mapGetters } from "vuex";
import news from "../../components/News/addNews.vue";

export default {
  components: {
    news,
  },
  data() {
    return {
      show: false,
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        {
          key: "cityName",
          label: "City Name",
          sortable: true,
        },
        {
          key: "categoryName",
          label: "Category Name",
          sortable: true,
        },
        {
          key: "active",
          label: "Active",
          sortable: true,
        },
        {
          key: "createdDateTime",
          label: "Created Date & Time",
          sortable: true,
        },
        {
          key: "actions",
          label: "Action",
          sortable: false,
        },
      ],
      items: [],
    };
  },

  methods: {
    async getAllNewsByUserId() {
      await this.$store.dispatch("getNewsByUserId").then((response) => {
        if (response.data.status) {
          this.items = this.getNewsByUserId;
        } else {
          swal({
            text: response.data.message,
            icon: "error",
          });
        }
      });
    },

    async editNews(id) {
      await this.$store.dispatch("getNewsById", id).then((response) => {
        if (response.data.status) {
          this.show = true;
        }
      });
    },

    async deleteNews(id) {
      await this.$store.dispatch("delNews", id).then((response) => {
        if (response.data.status) {
          this.getAllNewsByUserId();
        } else {
          swal({
            text: response.data.message,
            icon: "error",
          });
        }
      });
    },

    closeModel() {
      debugger;
      this.show = false;
      this.getAllNewsByUserId();
    },
  },
  mounted() {
    this.getAllNewsByUserId();
  },
  computed: {
    ...mapGetters(["getNewsByUserId"]),
  },
};
</script>
