<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <section>
        <v-sparkline
          :gradient="['#000000', '#42b983', '#2c3e50']"
          height="15"
          padding="2"
          line-width="1"
          :value="value"
          auto-draw
        ></v-sparkline>
        <v-list-item class="py-0 my-0">
          <v-list-item-content class="text-right">
            <v-list-item-title>{{
              $store.state.mainStore.config.company &&
              $store.state.mainStore.config.company.name
            }}</v-list-item-title>
            <v-list-item-subtitle>
              {{
                $store.state.mainStore.config.company &&
                $store.state.mainStore.config.company.phone
              }}
              <v-icon small>phone</v-icon>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{
                $store.state.mainStore.config.company &&
                $store.state.mainStore.config.company.email
              }}
              <v-icon small>mail</v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="mb-0 pb-0">
            <v-list-item-avatar size="100" class="mb-0 pb-0">
              <v-img
                :src="
                  '/storage/company/' +
                  ($store.state.mainStore.config.company &&
                    $store.state.mainStore.config.company.logo)
                "
                align-center
                class="text-center"
                icon
                contain
              />
            </v-list-item-avatar>
          </v-list-item-content>

          <v-list-item-content class="text-left">
            <v-list-item-title>{{ shop.name }}</v-list-item-title>
            <v-list-item-subtitle
              >Date :
              {{
                $store.state.mainStore.config.current_date
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </section>

      <v-tabs centered v-model="tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab>CONSUMPTION</v-tab>
        <v-tab>STORE</v-tab>
        <v-tab>RECEIVED</v-tab>
        <v-tab>RETURNED</v-tab>
        <v-tab>CONSUMPTION REPORT</v-tab>
        <v-tab>CONSUMPTION REPORT BY DATE</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="px-0">
        <v-tab-item>
          <Sales :key="shop.id" />
        </v-tab-item>

        <v-tab-item>
          <StoreBalance :key="shop.id" />
        </v-tab-item>

        <v-tab-item>
          <Received :key="shop.id" />
        </v-tab-item>

        <v-tab-item>
          <Returned :key="shop.id" />
        </v-tab-item>

        <v-tab-item>
          <SalesReport :key="shop.id" />
        </v-tab-item>

        <v-tab-item>
          <SalesReportByDate :key="shop.id" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import StoreBalance from "./StoreBalance.vue";
import Received from "./Received.vue";
import Returned from "./Returned.vue";
import Sales from "./Sales.vue";
import SalesReport from "./SalesReport.vue";
import SalesReportByDate from "./SalesReportByDate.vue";
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  components: {
    StoreBalance,
    Received,
    Sales,
    SalesReport,
    Returned,
    SalesReportByDate,
  },
  data: () => ({
    tab: 0,
    shop: {},

    fill: true,
    gradients,
    padding: 2,
    radius: 5,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
  }),
  methods: {
    fetchItem() {
      axios
        .get("/api/shop/" + this.$route.params.id)
        .then((response) => {
          this.shop = response.data.shop;
        })
        .catch((error) => {});
    },
  },
  watch: {
    "$route.params": {
      handler() {
        this.fetchItem();
        window.loca;
      },
    },
  },
  created() {
    this.tab = parseInt(this.$route.query.tab);
    this.fetchItem();
  },
};
</script>