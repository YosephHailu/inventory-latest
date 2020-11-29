<template>
  <v-container>
    <v-btn @click="int_print" fixed dark fab bottom right color="cyan" class="no-print">
      <v-icon>print</v-icon>
    </v-btn>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">ADD ISSUED ITEMS</v-card-title>
        <v-divider></v-divider>
        <v-btn text outlined class="white--text no-print" @click="$router.go(-1)">close</v-btn>
      </v-toolbar>
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Issue number : {{issue_good.issue_id}}</v-list-item-subtitle>
            <v-list-item-subtitle>Request number : {{issue_good.request_no}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle>Section : {{issue_good.section && issue_good.section.name}}</v-list-item-subtitle>
            <v-list-item-subtitle>Issued by : {{issue_good.issued_by}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title>Approved by : {{issue_good.approved_by}}</v-list-item-title>
            <v-list-item-subtitle>Received by : {{issue_good.received_by}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action class="no-print">
            <v-btn icon :to="{path:'/issue-good/'+issue_good.id + '/edit'}">
              <v-icon color="blue">edit</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item-subtitle>{{issue_good && issue_good.remark}}</v-list-item-subtitle>
      </v-card>
      <v-form ref="form" v-model="valid" @submit="handelSubmit" class="pt-4 no-print">
        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <v-autocomplete
              v-model="item_issued.item.item_category.id"
              :items="item_categories"
              item-text="category"
              item-value="id"
              @change="fetchItem"
              :rules="[v => !!v || 'Category field is required']"
              label="Item category"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" class="py-0">
            <v-autocomplete
              v-model="item_issued.item_id"
              :items="items"
              item-text="name"
              item-value="id"
              @change="selectItem"
              :rules="[v => !!v || 'Item field is required']"
              label="Item "
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-text-field
              v-model="item_issued.quantity"
              type="number"
              :rules="[v => !!v || 'Quantity is required', v => v <= item.balance
                 || 'Insufficient balance, available-balance : ' + item.balance]"
              label="Quantity"
            ></v-text-field>
          </v-col>
          <v-col class="py-3">
            <v-btn icon v-if="item_issued.quantity > item.balance">
              <v-icon color="red">report_problem</v-icon>
            </v-btn>
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
          <v-col v-for="(issued_item, index) in issued_items" :key="index">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{issued_item.item.name}}</v-list-item-title>
                <v-list-item-subtitle>Quantity : {{issued_item.quantity}}, Average price : {{issued_item.avg_price}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="no-print">
                <v-btn icon v-bind:to="{path:'/item/'+issued_item.item.id}">
                  <v-icon size="20">launch</v-icon>
                </v-btn>
                <v-btn icon @click="initEdit(issued_item)">
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
                <v-btn icon @click="deleteItem(issued_item)">
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
    issue_good: {
      section: {}
    },
    item_issued: {
      item_id: null,
      item: {
        item_category: {}
      }
    },
    item: {},
    btn_loading: false,
    issued_items: [],
    item_categories: [],
    items: []
  }),
  methods: {
    clearForm() {
      this.item_issued = {
        item_id: null,
        item: {
          item_category: {}
        }
      };
      this.edit = false;
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item_issued).forEach(key =>
          formData.append(key, this.item_issued[key])
        );

        formData.append("issue_item_id", this.issue_good.id);

        axios
          .post("/api/item_issue", formData)
          .then(response => {
            this.issued_items.unshift(response.data.item_issued);
            this.btn_loading = false;
            this.clearForm();
            
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },
    initEdit(item_issued) {
      this.edit = true;
      this.item_issued = item_issued;
      this.item = item_issued.item;
      this.item.balance += item_issued.quantity;
      this.fetchItem();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item_issued).forEach(key =>
          formData.append(key, this.item_issued[key])
        );

        formData.append("issue_item_id", this.issue_good.id);
        formData.append("_method", "put");

        axios
          .post("/api/item_issue/" + this.item_issued.id, formData)
          .then(response => {
            this.fetchIssuedGood();
            this.btn_loading = false;
            this.clearForm();

            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });

            this.$store.state.mainStore.alert.message = response.data.status;
            this.$store.state.mainStore.alert.type = "success";
            this.$store.state.mainStore.alert.visible = true;
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },
    selectItem() {
      this.item = this.items.filter(item => {
        return item.id == this.item_issued.item_id;
      })[0];
      this.$refs.form.validate();
    },
    deleteItem(issued_item) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/item_issue/" + issued_item.id)
          .then(response => {
            this.issued_items.splice(this.issued_items.indexOf(issued_item), 1);
          })
          .catch(error => {});
      }
    },

    fetchIssuedGood() {
      axios
        .get("/api/issue_item/" + this.$route.params.id + "?q=" + this.search)
        .then(response => {
          this.issue_good = response.data.issue_item;
          this.issued_items = response.data.item_issue;
        })
        .catch(error => {});
    },

    fetchItem() {
      axios
        .get(
          "/api/items?item_category_id=" +
            this.item_issued.item.item_category.id
        )
        .then(response => {
          this.items = response.data.items;
        })
        .catch(error => {});
    },
    fetchOptions() {
      axios
        .get("/api/itemOptions")
        .then(response => {
          this.item_categories = response.data.itemCategories;
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