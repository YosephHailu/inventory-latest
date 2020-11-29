<template>
  <div class="text-center">
    <v-dialog v-model="date_dialog_visible" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mt-6 mr-2"
          small
          outlined
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          >filter</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="blue title white--text lighten-2" dark>
          Filter
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col cols="6" class="py-0">
              <v-text-field
                hide-details
                :rules="[(v) => !!v || 'Day from is required']"
                v-model="date.day_from"
                label="Day from"
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-text-field
                hide-details
                :rules="[(v) => !!v || 'Day to is required']"
                v-model="date.day_to"
                label="Day to"
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-autocomplete
                hide-details
                menu-props="auto"
                item-text="name"
                item-value="value"
                v-model="date.month_from"
                :items="months"
                :rules="[(v) => !!v || 'Month form is required']"
                label="Month from"
              ></v-autocomplete>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-autocomplete
                hide-details
                menu-props="auto"
                item-text="name"
                item-value="value"
                v-model="date.month_to"
                :rules="[(v) => !!v || 'Month to is required']"
                :items="months"
                label="Month to"
              ></v-autocomplete>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-autocomplete
                hide-details
                menu-props="auto"
                v-model="date.year_from"
                :items="years"
                :rules="[(v) => !!v || 'Year form is required']"
                label="Year from"
              ></v-autocomplete>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-autocomplete
                hide-details
                menu-props="auto"
                v-model="date.year_to"
                :items="years"
                :rules="[(v) => !!v || 'Year to is required']"
                label="Year to"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="search">
            <v-icon>search</v-icon> Search
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { months } from "../../helper/date";

export default {
  data: () => ({
    valid: false,
    date_dialog_visible: false,
    // search: "",
    date: {},

    months,
    years: [],
  }),
  methods: {
    search() {
      this.$emit('onDetailSearch', this.date);
    },
  },
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
  },
};
</script>