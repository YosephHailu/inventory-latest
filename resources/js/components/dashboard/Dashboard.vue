<template >
  <section>
    <v-row>
      <v-col class="pb-0">
        <v-card class="text-center py-5 cyan">
          <v-btn outlined dark rounded>
            <v-icon class="mr-2" size="15">category</v-icon>
            {{statistics.item_count}}
          </v-btn>
          <v-card-subtitle class="white--text py-0">Raw Material</v-card-subtitle>
        </v-card>
      </v-col>

      <v-col class="pb-0">
        <v-card class="text-center py-5 cyan">
          <v-btn outlined dark rounded>
            <v-icon class="mr-2" size="17">check</v-icon>{{statistics.f_g_count}}
          </v-btn>
          <v-card-subtitle class="white--text py-0">Finished good</v-card-subtitle>
        </v-card>
      </v-col>

      <v-col class="pb-0">
        <v-card class="text-center py-5 cyan">
          <v-btn outlined dark rounded>
            <v-icon class="mr-2" size="17">settings_input_component</v-icon>455
          </v-btn>
          <v-card-subtitle class="white--text py-0">Spare part</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="my-3">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Todays Sale's Goal : 100 Items</v-list-item-title>
              <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon size="50">show_chart</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-subtitle>Sold : 0 Items</v-list-item-subtitle>
            <v-list-item-subtitle class="text-right">0.5 %</v-list-item-subtitle>
          </v-list-item>
        </v-card>

        <v-card class="my-3">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Todays Sale's Goal : 100 Items</v-list-item-title>
              <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon size="50">show_chart</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-subtitle>Sold : 0 Items</v-list-item-subtitle>
            <v-list-item-subtitle class="text-right">0.5 %</v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card>
              <v-card-subtitle class="text-center">Received items</v-card-subtitle>
              <trend
                :data="statistics.received_quantity"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                smooth
              ></trend>
            </v-card>
          </v-col>

          <v-col>
            <v-card>
              <v-card-subtitle class="text-center">Issued items</v-card-subtitle>
              <trend
                :data="statistics.issued_quantity"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                smooth
              ></trend>
            </v-card>
          </v-col>
        </v-row>
        <bars
          :data="[15, 25, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0]"
          :gradient="['#6fa8dc', '#42b983']"
          :labelSize=".7"
        ></bars>
        <v-row>
          <v-col>
            <v-card>
              <v-card-subtitle class="text-center">Received finished good</v-card-subtitle>
              <trend
                :data="statistics.f_g_received_quantity"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                smooth
              ></trend>
            </v-card>
          </v-col>

          <v-col>
            <v-card>
              <v-card-subtitle class="text-center">Issued finished good</v-card-subtitle>
              <trend
                :data="statistics.f_g_issued_quantity"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                smooth
              ></trend>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      statistics: {
        item_count: 0,
        received_quantity: [],
        issued_quantity: [],
        f_g_received_quantity: [],
        f_g_issued_quantity: [],
      }
    };
  },

  methods: {
    fetchStatistics() {
      axios
        .get("/api/dashboard_statistics")
        .then(response => {
          console.log(response.data);
          this.statistics = { ...response.data };
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  },
  created() {
    this.fetchStatistics();
  }
};
</script>