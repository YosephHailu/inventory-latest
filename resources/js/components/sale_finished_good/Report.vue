<template>
  <v-container>
    <v-card class="pb-5">
      <v-toolbar class="white">
        <v-divider></v-divider>
        <v-card-title class>GOOD RECEIVED REPORT</v-card-title>
        <v-divider></v-divider>
      </v-toolbar>

      <print-header />

      <v-row class="px-5 no-print">
        <v-text-field hide-details label="Search by name or item id" v-model="search">
          <template v-slot:append>
            <v-btn icon @click="search = ''">
              <v-icon size="20">close</v-icon>
            </v-btn>
          </template>
        </v-text-field>

        <v-select
          v-model="section_id"
          hide-details
          :items="sections"
          item-text="name"
          item-value="id"
          label="Select section"
          @input="fetchItems"
        >
          <template v-slot:append>
            <v-btn icon @click="section_id = ''; fetchItems()">
              <v-icon size="20">close</v-icon>
            </v-btn>
          </template>
        </v-select>
        <v-spacer></v-spacer>
        <v-btn class="mt-5 mx-1" text color="cyan" dark @click="fetchItems">
          <v-icon>import_export</v-icon>EXPORT
        </v-btn>
        <v-btn class="mt-5 mx-1" text color="cyan" dark @click="int_print">
          <v-icon class="mx-2">print</v-icon>Print
        </v-btn>
      </v-row>
      <v-simple-table dense class="pa-0" fixed-header>
        <thead>
          <tr>
            <th>Grn</th>
            <th>Item id</th>
            <th>Item name</th>
            <th>Section</th>
            <th>Issued by</th>
            <th>Quantity</th>
            <th>Item price</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item_issued, grn) in issued_by_id" style="width: 100%">
            <td class="border-all text-top" :key="grn">{{grn}}</td>
            <tr
              :class="item.balance <= item.min_balance ? 'red--text': ''"
              v-for="(received) in item_issued"
              :key="received.id"
              style="width: 100%"
            >
              <td class="starter-border"></td>
              <td>{{received.item.item_id}}</td>
              <td>{{received.item.name}}</td>
              <td>{{received.issue_item.section && received.issue_item.section.name}}</td>
              <td>{{received.issue_item.issued_by}}</td>
              <td>{{received.quantity}}</td>
              <td class="no-right-border">{{ received.avg_price.toFixed(2)}}</td>
            </tr>
            
          </template>
        </tbody>
      </v-simple-table>

      <v-pagination
        v-model="options.current_page"
        circle
        :length="options.last_page"
        @input="fetchItems"
      ></v-pagination>
    </v-card>
  </v-container>
</template>

<script>
import PrintHeader from "../layouts/PrintHeader";
export default {
  components: {
    PrintHeader
  },
  data: () => ({
    valid: false,
    delete_dialog: false,
    search: "",
    section_id: "",
    items: [],
    item: {},
    options: {
      itemsPerPage: 100
    },
    total_items: 0,
    itemsPerPage: 1,
    issued_by_id: [],
    sections: []
  }),
  methods: {
    fetchItems() {
      axios
        .get(
          "/api/item_issue?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.current_page +
            "&q=" +
            this.search +
            "&section_id=" +
            this.section_id
        )
        .then(response => {
          this.options.current_page = response.data.item_issued.current_page;
          this.options.last_page = response.data.item_issued.last_page;
          this.issued_by_id = response.data.item_issued.data.reduce((r, a) => {
            r[a.issue_item.issue_id] = [...(r[a.issue_item.issue_id] || []), a];
            return r;
          }, {});
        })
        .catch(error => {});
    },
    int_print() {
      window.print();
    },

    fetchOptions() {
      axios
        .get("/api/itemIssueOptions")
        .then(response => {
          this.sections = response.data.sections;
        })
        .catch(error => {});
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchItems();
      },
      deep: true
    },
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      }
    }
  },
  created() {
    // this.$store.state.mainStore.sidebar_panel = false;
    this.fetchItems();
    this.fetchOptions();
    this.debouncedGetItems = _.debounce(this.fetchItems, 1000);
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