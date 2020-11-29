<template>
  <section>
    <v-card>
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">Measurement Units</v-card-title>
        <v-divider></v-divider>

        <v-btn @click="dialog=true" absolute dark fab right color="cyan">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card>
      <v-row>
        <v-col cols="6" v-for="(unit, index) in units" :key="index" class="py-0">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{unit.name}}</v-list-item-title>
              <v-list-item-subtitle>{{unit.created_at}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="initDelete(unit)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text">Unit registration form</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-text-field
              v-model="unit.name"
              label="Unit name*"
              :rules="[v => !!v || 'Name is required']"
              required
            ></v-text-field>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              :loading="btn_loading"
              text
              @click.prevent="handelSubmit"
            >Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" class="danger" persistent max-width="290">
      <v-card class="red" dark>
        <v-card-title class="center headline">Confirm</v-card-title>
        <v-card-text>
          This operation is irreversible. are you sure you went to continue,
          Press cancel to get back
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white " text @click="delete_dialog = false;">Cancel</v-btn>
          <v-btn color="white" text @click="confirmDelete">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      delete_dialog: false,
      btn_loading: false,
      dialog: false,
      unit: {},
      units: []
    };
  },
  methods: {
    fetchUnits() {
      axios
        .get("/api/unit")
        .then(response => {
          this.units = response.data.units;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.unit).forEach(key =>
        formData.append(key, this.unit[key])
      );

      axios
        .post("/api/unit", formData)
        .then(response => {
          this.fetchUnits();
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.unit).forEach(key =>
        formData.append(key, this.unit[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/unit/" + this.$route.params.id, formData)
        .then(response => {
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          (this.dialog = false), (this.btn_loading = false);
        });
    },

    initDelete(unit) {
      this.unit = unit;
      this.delete_dialog = true;
    },
    confirmDelete() {
      axios
        .delete("/api/unit/" + this.unit.id)
        .then(response => {
          this.fetchUnits();
          this.delete_dialog = false;
        })
        .catch(error => {
          this.delete_dialog = false;
        });
    }
  },
  created() {
    this.fetchUnits();
  }
};
</script>