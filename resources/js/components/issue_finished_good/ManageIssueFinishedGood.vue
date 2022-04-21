<template>
  <v-container>
    <v-btn @click="int_print" fixed dark fab bottom right color="cyan" class="no-print">
      <v-icon>print</v-icon>
    </v-btn>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">ADD ISSUED FINISHED GOODS</v-card-title>
        <v-divider></v-divider>
        <v-btn text outlined class="white--text no-print" @click="$router.go(-1)">close</v-btn>
      </v-toolbar>
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Issue number : {{f_g_issue.issue_id}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle>Shop : {{f_g_issue.shop && f_g_issue.shop.name}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle
              class="text-right"
            >{{`${f_g_issue.day} - ${f_g_issue.month} -${f_g_issue.year}`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action class="no-print">
            <v-btn icon :to="{path:'/issue-finished-good/'+f_g_issue.id + '/edit'}">
              <v-icon color="blue">edit</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item-subtitle>{{f_g_issue && f_g_issue.remark}}</v-list-item-subtitle>
      </v-card>
      <v-form ref="form" v-model="valid" @submit="handelSubmit" class="pt-4 no-print">
        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <v-autocomplete
              v-model="f_g_issue_detail.finished_good.finished_good_model_id"
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
              v-model="f_g_issue_detail.finished_good_id"
              :items="finished_goods"
              item-text="name"
              item-value="id"
              @change="selectFinishedGood"
              :rules="[v => !!v || 'Finished good field is required']"
              label="Finished good"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" class="py-0">
            <v-text-field
              v-model="f_g_issue_detail.quantity"
              :rules="[v => !!v || 'Quantity is required', v => v <= finished_good.balance
                 || 'Insufficient balance, available-balance : ' + finished_good.balance]"
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
          <v-col v-for="(issued_item, index) in f_g_issued_detail" :key="index">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{issued_item.finished_good.name}}</v-list-item-title>
                <v-list-item-subtitle>Quantity : {{issued_item.quantity}}, Average price : {{issued_item.avg_price}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="no-print">
                <v-btn icon v-bind:to="{path:'/finished-good/'+issued_item.finished_good.id}">
                  <v-icon size="20">launch</v-icon>
                </v-btn>
                <v-btn icon @click="initEdit(issued_item)">
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
                <v-btn icon @click="deleteIssued(issued_item)">
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
    f_g_issue: {
      shop: {}
    },
    f_g_issue_detail: {
      finished_good_id: null,
      finished_good: {
        finished_good_model_id: ""
      }
    },
    finished_good: {},
    btn_loading: false,
    f_g_issued_detail: [],
    finished_good_models: [],
    finished_goods: []
  }),
  methods: {
    clearForm() {
      this.f_g_issue_detail = {
        item_id: null,
        finished_good: {}
      };
      this.edit = false;
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_issue_detail).forEach(key =>
          formData.append(key, this.f_g_issue_detail[key])
        );

        formData.append("f_g_issue_id", this.f_g_issue.id);

        axios
          .post("/api/finished_good_issue_detail", formData)
          .then(response => {
            this.f_g_issued_detail.unshift(response.data.f_g_issue_detail);
            this.btn_loading = false;
            this.clearForm();
          })
          .catch(error => {
            console.log(error.response.data)
            this.btn_loading = false;
          });
      }
    },
    initEdit(f_g_issue_detail) {
      this.edit = true;
      this.f_g_issue_detail = f_g_issue_detail;
      this.finished_good = f_g_issue_detail.finished_good;
      this.finished_good.balance += f_g_issue_detail.quantity;
      this.fetchFinishedGoods();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_issue_detail).forEach(key =>
          formData.append(key, this.f_g_issue_detail[key])
        );

        formData.append("f_g_issue_id", this.f_g_issue.id);
        formData.append("_method", "put");

        axios
          .post(
            "/api/finished_good_issue_detail/" + this.f_g_issue_detail.id,
            formData
          )
          .then(response => {
            this.fetchIssuedGood();
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
      this.finished_good = this.finished_goods.filter(finished_good => {
        return finished_good.id == this.f_g_issue_detail.finished_good_id;
      })[0];
      this.$refs.form.validate();
    },
    deleteIssued(f_g_issue_detail) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/finished_good_issue_detail/" + f_g_issue_detail.id)
          .then(response => {
            this.f_g_issued_detail.splice(
              this.f_g_issued_detail.indexOf(f_g_issue_detail),
              1
            );
          })
          .catch(error => {});
      }
    },

    fetchIssuedGood() {
      axios
        .get(
          "/api/finished_good_issue/" +
            this.$route.params.id +
            "?q=" +
            this.search
        )
        .then(response => {
          this.f_g_issue = response.data.f_g_issue;
          this.f_g_issued_detail = response.data.f_g_issue_detail;
        })
        .catch(error => {});
    },

    fetchFinishedGoods() {
      axios
        .get(
          "/api/finished_goods?finished_good_model_id=" +
            this.f_g_issue_detail.finished_good.finished_good_model_id
        )
        .then(response => {
          this.finished_goods = response.data.finished_goods;
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
    this.fetchIssuedGood();

    this.debouncedFetchIssuedGood = _.debounce(this.fetchIssuedGood, 1000);
  },
  watch: {
    search: {
      handler() {
        this.debouncedFetchIssuedGood();
      }
    }
  }
};
</script>