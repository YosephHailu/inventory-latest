<template>
  <section>
    <v-card>
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">DEPARTMENTS</v-card-title>
        <v-divider></v-divider>

        <v-btn @click="dialog=true" absolute dark fab right color="cyan">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card>
      <v-row>
        <v-col cols="6" v-for="(department, index) in departments" :key="index" class="py-0">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{department.name}}</v-list-item-title>
              <v-list-item-subtitle>{{department.department_id}}, {{department.tin_no}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="initDelete(department)">
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
          <v-card-title class="white--text">DEPARTMENT REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-text-field
              v-model="department.department_id"
              label="Department Id*"
              :rules="[v => !!v || 'Department id is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="department.name"
              label="Name*"
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
      department: {},
      departments: []
    };
  },
  methods: {
    fetchSuppliers() {
      axios
        .get("/api/department")
        .then(response => {
          this.departments = response.data.departments;
        })
        .catch(error => {});
    },
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.department).forEach(key =>
        formData.append(key, this.department[key])
      );

      axios
        .post("/api/department", formData)
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

      Object.keys(this.department).forEach(key =>
        formData.append(key, this.department[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/department/" + this.$route.params.id, formData)
        .then(response => {
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          (this.dialog = false), (this.btn_loading = false);
        });
    },

    initDelete(department) {
      this.department = department;
      this.delete_dialog = true;
    },
    confirmDelete() {
      axios
        .delete("/api/department/" + this.department.id)
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
  }
};
</script>