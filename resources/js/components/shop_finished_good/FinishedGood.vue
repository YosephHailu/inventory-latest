<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">{{
          shop_f_g.finished_good.name
        }}</v-card-title>
        <v-divider></v-divider>
        <v-btn
          text
          outlined
          class="white--text no-print"
          @click="$router.go(-1)"
          >close</v-btn
        >
      </v-toolbar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="100">
            <img
              :src="'/storage/finished_good/' + shop_f_g.finished_good.photo"
              alt
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              shop_f_g.finished_good.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              shop_f_g.finished_good.finished_good_id
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title
              >Balance : {{ shop_f_g.quantity }}</v-list-item-title
            >
            <v-list-item-subtitle>{{
              `I balance : ${shop_f_g.initial_balance},`
            }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              `B balance : ${shop_f_g.beginning_balance},`
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Received</v-list-item-title>
            <v-list-item-subtitle>{{
              `Quantity : ${f_g_received_count},`
            }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              `AVG Price : ${f_g_received_price},`
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Sales</v-list-item-title>
            <v-list-item-subtitle>{{
              `Quantity : ${f_g_sale_count},`
            }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              `Price : ${f_g_sale_price},`
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Return</v-list-item-title>
            <v-list-item-subtitle>{{
              `Quantity : ${f_g_return_count},`
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>

      <v-tabs centered v-model="tab">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>RECEIVED</v-tab>
        <v-tab>SOLD</v-tab>
        <v-tab>Returned</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="px-0">
        <v-tab-item>
          <Received />
        </v-tab-item>
        <v-tab-item>
          <Sold />
        </v-tab-item>
        <v-tab-item>
          <Returned />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Received from "./Received.vue";
import Sold from "./Sold.vue";
import Returned from "./Returned.vue";

export default {
  components: {
    Received,
    Sold,
    Returned,
  },
  data: () => ({
    tab: 1,
    f_g_sale_count: 0,
    f_g_received_count: 0,
    f_g_return_count: 0,
    f_g_received_price: 0,
    f_g_sale_price: 0,
    shop_f_g: {
      finished_good: {},
    },
  }),
  methods: {
    fetchItem() {
      axios
        .get(
          "/api/shop_finished_good_detail/" +
            this.$route.params.shop_id +
            "/" +
            this.$route.params.id
        )
        .then((response) => {
          this.f_g_sale_count = response.data.f_g_sale_count;
          this.f_g_received_count = response.data.f_g_received_count;
          this.f_g_return_count = response.data.f_g_return_count;

          this.f_g_sale_price = response.data.f_g_sale_price;
          this.f_g_received_price = response.data.f_g_received_price;

          this.shop_f_g = response.data.shop_f_g;
        })
        .catch((error) => {});
    },
  },
  watch: {},
  created() {
    this.fetchItem();
  },
};
</script>