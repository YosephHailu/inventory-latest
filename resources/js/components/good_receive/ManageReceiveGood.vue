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
        <v-card-title class="white--text">ADD RECEIVED ITEMS</v-card-title>
        <v-divider></v-divider>
        <v-btn
          text
          outlined
          class="white--text no-print"
          @click="$router.go(-1)"
          >close</v-btn
        >
      </v-toolbar>
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              >GRN : {{ good_receive.good_receive_id }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Invoice : {{ good_receive.invoice_no }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Supplier :
              {{
                good_receive.supplier && good_receive.supplier.name
              }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle
              >Prepared by :
              {{ good_receive.prepared_by }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Approved by :
              {{ good_receive.approved_by }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle
              >Proforma No : {{ good_receive.pro_no }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Purchase No : {{ good_receive.po_no }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-action class="no-print">
            <v-btn
              icon
              :to="{ path: '/receive-good/' + good_receive.id + '/edit' }"
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
              v-model="item_received.item.item_category.id"
              :items="item_categories"
              item-text="category"
              item-value="id"
              @change="fetchItem"
              :rules="[(v) => !!v || 'Category field is required']"
              label="Item category"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-autocomplete
              v-model="item_received.item_id"
              :items="items"
              item-text="name"
              item-value="id"
              :rules="[(v) => !!v || 'Item field is required']"
              label="Item "
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-text-field
              v-model="item_received.quantity"
              :rules="[(v) => !!v || 'Quantity is required']"
              label="Quantity"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3" class="py-0">
            <v-text-field
              v-model="item_received.item_price"
              :rules="[(v) => !!v || 'Item price is required']"
              label="Item price"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            dark
            type="submit"
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelUpdate"
            >Save</v-btn
          >

          <v-btn
            dark
            type="submit"
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
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
                received_items.reduce(function (total, value) {
                  return total + Number(value.quantity);
                }, 0)
              }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-subtitle>
              Total price :
              {{
                received_items.reduce(function (total, value) {
                  return total + value.item_price * value.quantity;
                }, 0).toLocaleString()
              }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-subtitle>
              VAT :
              {{
                ((received_items.reduce(function (total, value) {
                  return total + value.item_price * value.quantity;
                }, 0) *
                  15) /
                100).toLocaleString()
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-row>
          <v-col v-for="(received_item, index) in received_items" :key="index">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{
                  received_item.item.name
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >Quantity : {{ received_item.quantity }}, Price :
                  {{ received_item.item_price }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-icon class="no-print">
                <v-btn
                  icon
                  v-bind:to="{ path: '/item/' + received_item.item.id }"
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
import AddItem from "./AddItem";
export default {
  components: {
    AddItem,
  },
  data: () => ({
    search: "",
    edit: false,
    valid: false,
    good_receive: {
      supplier: {},
    },
    item_received: {
      item_id: null,
      item: {
        item_category: {},
      },
    },
    btn_loading: false,
    received_items: [],
    item_categories: [],
    items: [],
  }),
  methods: {
    clearForm() {
      this.item_received = {
        item_id: null,
        item: {
          item_category: {},
        },
      };
      this.edit = false;
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item_received).forEach((key) =>
          formData.append(key, this.item_received[key])
        );

        formData.append("good_receive_id", this.good_receive.id);

        axios
          .post("/api/item_receive", formData)
          .then((response) => {
            this.received_items.unshift(response.data.item_received);
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
    initEdit(item_received) {
      this.edit = true;
      this.item_received = item_received;
      this.fetchItem();
      this.$vuetify.goTo(0, 0);
    },
    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item_received).forEach((key) =>
          formData.append(key, this.item_received[key])
        );

        formData.append("good_receive_id", this.good_receive.id);
        formData.append("_method", "put");

        axios
          .post("/api/item_receive/" + this.item_received.id, formData)
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
          .delete("/api/item_receive/" + received_item.id)
          .then((response) => {
            this.received_items.splice(
              this.received_items.indexOf(received_item),
              1
            );
          })
          .catch((error) => {});
      }
    },

    fetchGoodReceive() {
      axios
        .get("/api/good_receive/" + this.$route.params.id + "?q=" + this.search)
        .then((response) => {
          this.good_receive = response.data.good_receive;
          this.received_items = response.data.item_receive;
        })
        .catch((error) => {});
    },

    fetchItem() {
      axios
        .get(
          "/api/items?item_category_id=" +
            this.item_received.item.item_category.id
        )
        .then((response) => {
          this.items = response.data.items;
        })
        .catch((error) => {});
    },
    fetchOptions() {
      axios
        .get("/api/itemOptions")
        .then((response) => {
          this.item_categories = response.data.itemCategories;
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