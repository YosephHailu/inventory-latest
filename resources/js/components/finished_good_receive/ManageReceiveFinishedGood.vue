<template>
  <v-container>
    <v-btn
      @click="int_print"
      fixed
      dark
      fab
      bottom
      right
      color="cyan"
      class="no-print"
    >
      <v-icon>print</v-icon>
    </v-btn>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text"
          >ADD RECEIVED FINISHED GOODS</v-card-title
        >
        <v-divider></v-divider>
        <v-btn
          text
          outlined=""
          class="white--text no-print"
          @click="$router.go(-1)"
        >
          close</v-btn
        >
      </v-toolbar>
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              >GRN : {{ f_g_receive.receive_id }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle
              >Department :
              {{ f_g_receive.department.name }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle class="text-right">{{
              `${f_g_receive.day} - ${f_g_receive.month} -${f_g_receive.year}`
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action class="no-print">
            <v-btn
              icon
              :to="{ path: '/receive-good/' + f_g_receive.id + '/edit' }"
            >
              <v-icon color="blue">edit</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <v-form
        ref="form"
        v-model="valid"
        @submit="handelSubmit"
        fixed
        class="pt-4 no-print"
      >
        <v-row>
          <v-col cols="12" md="3" class="py-0">
            <v-autocomplete
              v-model="f_g_received_detail.finished_good.finished_good_model_id"
              :items="finished_good_models"
              item-text="model"
              item-value="id"
              @change="fetchFinishedGoods"
              :rules="[(v) => !!v || 'Model field is required']"
              label="Model"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-autocomplete
              v-model="f_g_received_detail.finished_good_id"
              :items="finished_goods"
              item-text="name"
              item-value="id"
              :rules="[(v) => !!v || 'Finished good field is required']"
              label="Finished good"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-text-field
              v-model="f_g_received_detail.quantity"
              :rules="[(v) => !!v || 'Quantity is required']"
              label="Quantity"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-text-field
              v-model="f_g_received_detail.cost"
              :rules="[(v) => !!v || 'Cost field is required']"
              label="Cost"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            type="submit"
            @click.prevent="handelUpdate"
            >Save</v-btn
          >

          <v-btn
            dark
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            type="submit"
            @click.prevent="handelSubmit"
            >Add</v-btn
          >
        </div>
      </v-form>
    </v-card>

    <v-card class="my-2">
      <div class="no-print">
        <v-text-field
          label="Search by name or item id"
          solo-inverted
          hide-details
          v-model="search"
        ></v-text-field>
      </div>
      <v-list>
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-subtitle>
              Total items :
              {{
                f_g_receive_details
                  .reduce(function (total, value) {
                    return (total += value.quantity);
                  }, 0)
                  .toLocaleString()
              }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-subtitle>
              Total price :
              {{
                f_g_receive_details
                  .reduce(function (total, value) {
                    return (total += value.cost * value.quantity);
                  }, 0)
                  .toLocaleString()
              }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-subtitle>
              VAT :
              {{
                ((f_g_receive_details.reduce(function (total, value) {
                  return (total += value.cost * value.quantity);
                }, 0) *
                  15) /
                100).toLocaleString()
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-row>
          <v-col
            v-for="(received_item, index) in f_g_receive_details"
            :key="index"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{
                  received_item.finished_good.name
                }}</v-list-item-title>
                <v-list-item-subtitle>
                  Quantity : {{ received_item.quantity }}, cost :
                  {{ received_item.cost }} , vat :
                  {{
                    Math.round(
                      (received_item.cost * received_item.quantity * 15) / 100,
                      2
                    )
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="no-print">
                <v-btn
                  icon
                  v-bind:to="{
                    path: '/finished-good/' + received_item.finished_good.id,
                  }"
                >
                  <v-icon size="20">launch</v-icon>
                </v-btn>
                <v-btn icon @click="initEdit(received_item)">
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
                <v-btn icon @click="deleteItem(received_item)">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    edit: false,
    valid: false,
    f_g_receive: {
      department: {},
    },
    f_g_received_detail: {
      finished_good: {},
    },
    btn_loading: false,
    f_g_receive_details: [],
    finished_good_models: [],
    finished_goods: [],
  }),
  methods: {
    clearForm() {
      this.f_g_received_detail = {
        finished_good_id: null,
        finished_good: {},
      };
      this.edit = false;
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_received_detail).forEach((key) =>
          formData.append(key, this.f_g_received_detail[key])
        );

        formData.append("f_g_receive_id", this.f_g_receive.id);

        axios
          .post("/api/finished_good_receive_detail", formData)
          .then((response) => {
            this.f_g_receive_details.unshift(response.data.f_g_received_detail);
            this.btn_loading = false;
            this.clearForm();
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            this.btn_loading = false;
          });
      }
    },
    initEdit(f_g_received_detail) {
      this.edit = true;
      this.f_g_received_detail = f_g_received_detail;
      this.fetchFinishedGoods();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();
        Object.keys(this.f_g_received_detail).forEach((key) =>
          formData.append(key, this.f_g_received_detail[key])
        );

        formData.append("f_g_receive_id", this.f_g_receive.id);
        formData.append("_method", "put");

        axios
          .post(
            "/api/finished_good_receive_detail/" + this.f_g_received_detail.id,
            formData
          )
          .then((response) => {
            this.fetchGoodReceive();
            this.btn_loading = false;
            this.clearForm();
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            this.btn_loading = false;
          });
      }
    },

    deleteItem(received_item) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/finished_good_receive_detail/" + received_item.id)
          .then((response) => {
            this.f_g_receive_details.splice(
              this.f_g_receive_details.indexOf(received_item),
              1
            );
          })
          .catch((error) => {});
      }
    },

    fetchGoodReceive() {
      axios
        .get(
          "/api/finished_good_receive/" +
            this.$route.params.id +
            "?q=" +
            this.search
        )
        .then((response) => {
          this.f_g_receive = response.data.f_g_receive;
          this.f_g_receive_details = response.data.f_g_receive_details;
        })
        .catch((error) => {});
    },

    fetchFinishedGoods() {
      axios
        .get(
          "/api/finished_goods?finished_good_model_id=" +
            this.f_g_received_detail.finished_good.finished_good_model_id
        )
        .then((response) => {
          this.finished_goods = response.data.finished_goods;
        })
        .catch((error) => {});
    },

    fetchOptions() {
      axios
        .get("/api/finishedGoodOptions")
        .then((response) => {
          this.finished_good_models = response.data.finished_good_models;
        })
        .catch((error) => {});
    },
    int_print() {
      window.print();
    },
  },
  created() {
    this.fetchOptions();
    this.fetchGoodReceive();
    this.debouncedFetchGoodReceive = _.debounce(this.fetchGoodReceive, 1000);
  },
  watch: {
    search: {
      handler() {
        this.debouncedFetchGoodReceive();
      },
    },
  },
};
</script>