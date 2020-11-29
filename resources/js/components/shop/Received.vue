<template>
  <v-container>
    <v-row class="px-5 no-print">
      <v-text-field hide-details label="Search by finished good id or name" v-model="search">
        <template v-slot:append>
          <v-btn icon @click="search = ''">
            <v-icon size="20">close</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="mt-5 mx-1" text color="cyan" dark @click="int_print">
        <v-icon class="mx-2">print</v-icon>Print
      </v-btn>
    </v-row>

    <v-simple-table dense class="pa-0" fixed-header>
      <thead>
        <tr>
          <th>ISSUE ID</th>
          <th>FG id</th>
          <th>FG name</th>
          <th>Quantity</th>
          <th>AVG price</th>
          <th class="no-print" max-width="15px" style="max-width:45px"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(f_g_issued, grn) in finished_good_issued" style="width: 100%">
          <td class="border-all text-top mr-0 blue--text" :key="grn + 'a'" colspan="2">
            {{f_g_issued.issue_id}}
            <span
              class="small"
              small
              style="font-size: 9px; padding: 0px;"
            >({{f_g_issued.day + " - " + f_g_issued.month + " - " + f_g_issued.year}})</span>
          </td>
          <tr
            v-for="(received) in f_g_issued.f_g_issue_detail"
            :key="received.id"
            style="width: 100%"
          >
            <td class="starter-border"></td>
            <td>{{received.finished_good.finished_good_id}}</td>
            <td>{{received.finished_good.name}}</td>
            <td>{{received.quantity}}</td>
            <td class="no-right-border">{{ received.avg_price.toFixed(2)}}</td>
            <td class="no-print" style="max-width:65px">
              <v-btn
                icon
                :to="{path: '/shop-finished-good/' + received.finished_good_id + '/' + $route.params.id}"
              >
                <v-icon>launch</v-icon>
              </v-btn>
            </td>
          </tr>

          <tr :key="grn + 'b'">
            <td class="starter-border"></td>
            <td class="report-border"></td>
            <td class="report-border"></td>
            <td class="blue--text" style="border: solid 1px">
              Total :
              {{f_g_issued.f_g_issue_detail.reduce(function (total, value) {
              return total + Number(value.quantity);
              }, 0)}}
            </td>
            <td class="blue--text" style="border: solid 1px">
              Total :
              {{Math.floor(f_g_issued.f_g_issue_detail.reduce(function (total, value) {
              return total + Number(value.avg_price);
              }, 0))}}
            </td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      finished_good_issued: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "Issue id",
          value: "issue_id",
          class: "cyan--text"
        },
        {
          text: "Quantity",
          value: "f_g_issue_detail.quantity",
          class: "cyan--text"
        },
        {
          text: "AVG price",
          value: "f_g_issue_detail.avg_price",
          class: "cyan--text"
        },
        { text: "", value: "action", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchIssuedFinishedGoods() {
      axios
        .get(
          "/api/shop_receives/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page +
            "&q=" +
            this.search
        )
        .then(response => {
          console.log(response.data);
          this.finished_good_issued = response.data.f_g_issues.data;
          this.totalItems = response.data.f_g_issues.total;
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    int_print() {
      window.print();
    }
  },
  watch: {
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedReceivedGoods();
      }
    }
  },
  created() {
    this.fetchIssuedFinishedGoods();
    this.debouncedReceivedGoods = _.debounce(
      this.fetchIssuedFinishedGoods,
      1000
    );
  }
};
</script>


<style scoped>
td {
  height: 0px !important;
  border-top: solid 1px !important;
  border-right: solid 1px !important;
}
.report-border {
  border: 0px !important;
  border-top: solid 1px !important;
}
.starter-border {
  border: 0px !important;
  border-right: solid 1px !important;
}
.border-all {
  border: solid 1px !important;
}
.no-right-border {
  border-right: 0px;
}
th {
  background-color: #7fffd4 !important;
}
</style>