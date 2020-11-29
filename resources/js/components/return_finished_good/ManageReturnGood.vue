<template>
  <v-container>
    <v-btn @click="int_print" fixed dark fab bottom right color="cyan" class="no-print">
      <v-icon>print</v-icon>
    </v-btn>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">ADD RETURNED FINISHED GOODS</v-card-title>
        <v-divider></v-divider>
        <v-btn outlined class="white--text" :to="{path: '/shop/' + f_g_return.shop_id + '?tab=3'}">Close</v-btn>
      </v-toolbar>
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Return id : {{f_g_return.return_id}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle>Shop : {{f_g_return.shop && f_g_return.shop.name}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-right"
            >{{`${f_g_return.day} - ${f_g_return.month} -${f_g_return.year}`}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-subtitle>{{f_g_return && f_g_return.remark}}</v-list-item-subtitle>
      </v-card>
      <v-form ref="form" v-model="valid" @submit="handelSubmit" class="pt-4 no-print">
        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <v-autocomplete
              v-model="f_g_return_detail.finished_good.finished_good_model_id"
              :items="finished_good_models"
              item-text="model"
              item-value="id"
              @change="fetchFinishedGoods"
              :rules="[v => !!v || 'Model field is required']"
              label="Model"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" class="py-0">
            <v-autocomplete
              v-model="f_g_return_detail.shop_f_g_id"
              :items="shop_f_gs"
              item-text="finished_good.name"
              item-value="id"
              @change="selectFinishedGood"
              :rules="[v => !!v || 'Finished good field is required']"
              label="Finished good"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" class="py-0">
            <v-text-field
              v-model="f_g_return_detail.quantity"
              :rules="[v => !!v || 'Quantity is required', v => v <= shop_f_g.quantity
                 || 'Insufficient balance, available-balance : ' + shop_f_g.quantity]"
              label="Quantity"
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
            @click="handelUpdate"
          >Save</v-btn>

          <v-btn
            dark
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelSubmit"
          >Add</v-btn>

          <v-btn
            v-if="edit"
            :loading="btn_loading"
            outlined
            rounded
            class="float-right"
            @click="clearForm"
          >Cancel</v-btn>
        </div>
      </v-form>
    </v-card>

    <v-card class="my-2">
      <v-text-field
        label="Search by item name or id"
        class="no-print"
        solo-inverted
        hide-details
        v-model="search"
      ></v-text-field>
      <v-list>
        <v-row>
          <v-col v-for="(sold_item, index) in f_g_return_details" :key="index">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{sold_item.finished_good.name}}</v-list-item-title>
                <v-list-item-subtitle>Quantity : {{sold_item.quantity}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="no-print">
                <v-btn icon v-bind:to="{path:'/finished-good/'+sold_item.finished_good.id}">
                  <v-icon size="20">launch</v-icon>
                </v-btn>
                <v-btn icon @click="initEdit(sold_item)">
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
                <v-btn icon @click="deleteSold(sold_item)">
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
    f_g_return: {
      shop: {}
    },
    f_g_return_detail: {
      finished_good: {
        finished_good_model_id: ""
      }
    },
    shop_f_g: {},
    btn_loading: false,
    f_g_return_details: [],
    finished_good_models: [],
    shop_f_gs: []
  }),
  methods: {
    clearForm() {
      this.f_g_return_detail = {
        finished_good: {
          finished_good_model_id: ""
        }
      };
      this.edit = false;
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_return_detail).forEach(key =>
          formData.append(key, this.f_g_return_detail[key])
        );

        formData.append("f_g_return_id", this.f_g_return.id);

        axios
          .post("/api/finished_good_return_detail", formData)
          .then(response => {
            this.f_g_return_details.unshift(response.data.f_g_return_detail);
            this.btn_loading = false;
            this.clearForm();
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },
    initEdit(f_g_return_detail) {
      this.edit = true;
      this.f_g_return_detail = f_g_return_detail;
      this.fetchFinishedGoods();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_return_detail).forEach(key =>
          formData.append(key, this.f_g_return_detail[key])
        );

        formData.append("f_g_return_id", this.f_g_return.id);
        formData.append("_method", "put");

        axios
          .post(
            "/api/finished_good_return_detail/" + this.f_g_return_detail.id,
            formData
          )
          .then(response => {
            this.fetchSoldGood();
            this.btn_loading = false;
            this.clearForm();

            this.$store.state.mainStore.alert.message = response.data.status;
            this.$store.state.mainStore.alert.type = "success";
            this.$store.state.mainStore.alert.visible = true;
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },
    selectFinishedGood() {
      this.shop_f_g = this.shop_f_gs.filter(shop_f_g => {
        return shop_f_g.id == this.f_g_return_detail.shop_f_g_id;
      })[0];
      if (this.edit) this.shop_f_g.quantity += this.f_g_return_detail.quantity;
      this.$refs.form.validate();
    },
    deleteSold(f_g_return_detail) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/finished_good_return_detail/" + f_g_return_detail.id)
          .then(response => {
            this.f_g_return_details.splice(
              this.f_g_return_details.indexOf(f_g_return_detail),
              1
            );
          })
          .catch(error => {});
      }
    },

    fetchSoldGood() {
      axios
        .get(
          "/api/finished_good_return/" +
            this.$route.params.id +
            "?q=" +
            this.search
        )
        .then(response => {
          this.f_g_return = response.data.f_g_return;
          this.f_g_return_details = response.data.f_g_return_detail;
        })
        .catch(error => {});
    },

    fetchFinishedGoods() {
      axios
        .get(
          "/api/shop_finished_goods/" +
            this.f_g_return.shop_id +
            "?finished_good_model_id=" +
            this.f_g_return_detail.finished_good.finished_good_model_id
        )
        .then(response => {
          this.shop_f_gs = response.data.shop_f_gs.data;
          if (this.edit) this.selectFinishedGood();
        })
        .catch(error => {});
    },
    fetchOptions() {
      axios
        .get("/api/finishedGoodOptions")
        .then(response => {
          this.finished_good_models = response.data.finished_good_models;
        })
        .catch(error => {});
    },
    int_print() {
      window.print();
    }
  },
  created() {
    this.fetchOptions();
    this.fetchSoldGood();

    this.debouncedFetchSoldGood = _.debounce(this.fetchSoldGood, 1000);
  },
  watch: {
    search: {
      handler() {
        this.debouncedFetchSoldGood();
      }
    }
  }
};
</script>