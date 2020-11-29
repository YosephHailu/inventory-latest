<template>
  <section>
    <v-card>
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">FINISHED GOOD CATEGORY</v-card-title>
        <v-divider></v-divider>

        <v-btn @click="dialog=true" absolute dark fab right color="cyan">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card>
      <v-row>
        <v-col
          cols="6"
          v-for="(finished_good_category, index) in finished_good_categories"
          :key="index"
          class="py-0"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{finished_good_category.category}}</v-list-item-title>
              <v-list-item-subtitle>{{finished_good_category.category_id}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="initDelete(finished_good_category)">
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
          <v-card-title class="white--text">Finished good category registration form</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-text-field
              v-model="finished_good_category.category_id"
              label="category Id*"
              :rules="[v => !!v || 'Category id is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="finished_good_category.category"
              label="Category name*"
              :rules="[v => !!v || 'Category is required']"
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
      finished_good_category: {},
      finished_good_categories: []
    };
  },
  methods: {
    fetchUnits() {
      axios
        .get("/api/finished_good_category")
        .then(response => {
          this.finished_good_categories =
            response.data.finished_good_categories;
        })
        .catch(error => {});
    },
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.finished_good_category).forEach(key =>
        formData.append(key, this.finished_good_category[key])
      );

      axios
        .post("/api/finished_good_category", formData)
        .then(response => {
          this.fetchUnits();
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          console.log(error.response.data);
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.finished_good_category).forEach(key =>
        formData.append(key, this.finished_good_category[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/finished_good_category/" + this.$route.params.id, formData)
        .then(response => {
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          (this.dialog = false), (this.btn_loading = false);
        });
    },

    initDelete(finished_good_category) {
      this.finished_good_category = finished_good_category;
      this.delete_dialog = true;
    },
    confirmDelete() {
      axios
        .delete("/api/finished_good_category/" + this.finished_good_category.id)
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