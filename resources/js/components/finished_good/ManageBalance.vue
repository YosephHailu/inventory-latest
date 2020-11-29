<template>
  <v-card class="pa-3">
    <v-toolbar class="cyan">
      <v-divider></v-divider>
      <v-card-title class="white--text">MANAGE FINISHED GOOD INITIAL BALANCE</v-card-title>
      <v-divider></v-divider>
      <v-btn text outlined class="white--text no-print" @click="$router.go(-1)">close</v-btn>
    </v-toolbar>
    <v-form ref="form" v-model="valid" @submit="handelSubmit" class="pt-4 no-print">
      <v-row>
        <v-col cols="12" md="4" class="py-0">
          <v-autocomplete
            v-model="finished_good.finished_good_model_id"
            :items="finished_good_models"
            item-text="model"
            item-value="id"
            @change="fetchFinishedGood"
            label="Finished good model"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4" class="py-0">
          <v-autocomplete
            v-model="finished_good.id"
            :items="finished_goods"
            item-text="name"
            item-value="id"
            @change="selectFinishedGood"
            :rules="[v => !!v || 'Finished good is required']"
            label="Finished good "
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4" class="py-0">
          <v-text-field
            v-model="finished_good.initial_balance"
            type="number"
            :messages="'Current balance : ' + finished_good.balance "
            label="Initial balance"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-list-item v-if="finished_good.id">
        <v-list-item-content>
          <v-list-item-title>{{finished_good.name}}</v-list-item-title>
          <v-list-item-subtitle>{{finished_good.finished_good_model.model}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>Current balance : {{finished_good.balance}}</v-list-item-title>
          <v-list-item-subtitle>Initial balance : {{finished_good.initial_balance}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <div class="text-center mt-3">
        <v-btn
          dark
          color="cyan accent-6"
          :loading="btn_loading"
          rounded
          @click="handelSubmit"
        >Update</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      btn_loading: false,
      item_id: null,
      item: {
        item_category: {}
      },
      finished_good: {
        finished_good_model: {}
      },
      finished_goods: [],
      finished_good_models: []
    };
  },
  methods: {
    clearForm() {
      this.item = {
        item_category: {}
      };
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.finished_good).forEach(key =>
          formData.append(key, this.finished_good[key])
        );

        axios
          .post(
            "/api/updateFinishedGoodBalance/" + this.finished_good.id,
            formData
          )
          .then(response => {
            this.btn_loading = false;
            this.clearForm();
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },

    selectFinishedGood() {
      this.finished_good = this.finished_goods.filter(item => {
        return item.id == this.finished_good.id;
      })[0];
      this.$refs.form.validate();
    },

    fetchFinishedGood() {
      axios
        .get(
          "/api/finished_goods?finished_good_model_id=" +
            this.finished_good.finished_good_model_id
        )
        .then(response => {
          this.finished_goods = response.data.finished_goods;
        });
    },
    fetchOptions() {
      axios.get("/api/finishedGoodOptions").then(response => {
        this.finished_good_models = response.data.finished_good_models;
      });
    }
  },
  created() {
    this.fetchOptions();
  }
};
</script>