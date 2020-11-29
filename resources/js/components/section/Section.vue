<template>
  <section>
    <v-card>
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">SECTIONS</v-card-title>
        <v-divider></v-divider>

        <v-btn @click="dialog=true" absolute dark fab right color="cyan">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card>
      <v-row>
        <v-col v-for="(section, index) in sections" :key="index" cols="12" md="6">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{section.name}}</v-list-item-title>
              <v-list-item-subtitle>{{section.section_id}}, {{section.tin_no}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="initDelete(section)">
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
          <v-card-title class="white--text">SECTION REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-text-field
              v-model="section.section_id"
              label="Section Id*"
              :rules="[v => !!v || 'Section id is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="section.name"
              label="Name*"
              :rules="[v => !!v || 'Name is required']"
              required
            ></v-text-field>
            <v-select
              v-model="section.department_id"
              :items="departments"
              item-text="name"
              item-value="id"
              :rules="[v => !!v || 'Department field is required']"
              label="Department category"
            ></v-select>
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
      section: {},
      sections: [],
      departments: []
    };
  },
  methods: {
    fetchSuppliers() {
      axios
        .get("/api/section")
        .then(response => {
          this.sections = response.data.sections;
        })
        .catch(error => {});
    },
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.section).forEach(key =>
        formData.append(key, this.section[key])
      );

      axios
        .post("/api/section", formData)
        .then(response => {
          this.fetchSuppliers();
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.section).forEach(key =>
        formData.append(key, this.section[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/section/" + this.$route.params.id, formData)
        .then(response => {
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          (this.dialog = false), (this.btn_loading = false);
        });
    },

    fetchOptions() {
      axios
        .get("/api/department")
        .then(response => {
          this.departments = response.data.departments;
        })
        .catch(error => {});
    },

    initDelete(section) {
      this.section = section;
      this.delete_dialog = true;
    },
    confirmDelete() {
      axios
        .delete("/api/section/" + this.section.id)
        .then(response => {
          this.fetchSuppliers();
          this.delete_dialog = false;
        })
        .catch(error => {
          this.delete_dialog = false;
        });
    }
  },
  created() {
    this.fetchSuppliers();
    this.fetchOptions();
  }
};
</script>