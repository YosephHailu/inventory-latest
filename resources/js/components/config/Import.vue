<template>
  <section>
    <v-card>
      <v-toolbar class="white">
        <v-divider></v-divider>
        <v-btn class="cyan white--text" @click="takeBackup">TAKE BACKUP</v-btn>
        <v-divider></v-divider>
      </v-toolbar>
    </v-card>

    <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
      <v-container>
        <v-file-input
          v-model="file"
          label="Data import*"
          :rules="[v => !!v || 'FIle is required']"
          required
        ></v-file-input>
      </v-container>

      <div class="text-center mt-3">
        <v-btn
          dark
          color="cyan accent-6"
          :loading="btn_loading"
          rounded
          @click="handelSubmit(false)"
        >IMPORT</v-btn>
      </div>
    </v-form>

    <v-form ref="form" v-model="valid" @submit.prevent="importPrev">
      <v-container>
        <v-file-input
          v-model="received_file"
          label="Import data from version 1*"
          :rules="[v => !!v || 'FIle is required']"
          required
        ></v-file-input>
      </v-container>

      <div class="text-center mt-3">
        <v-btn
          dark
          color="cyan accent-6"
          :loading="btn_loading"
          rounded
          @click="importPrev"
        >IMPORT PREVIOUS DATA</v-btn>
      </div>
    </v-form>
    <!-- 
    <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
      <v-container>
        <v-file-input
          v-model="received_file"
          label="Import Good Receive*"
          :rules="[v => !!v || 'FIle is required']"
          required
        ></v-file-input>
      </v-container>

      <div class="text-center mt-3">
        <v-btn
          dark
          color="cyan accent-6"
          :loading="btn_loading"
          rounded
          @click="importReceive"
        >IMPORT</v-btn>
      </div>
    </v-form>
    
    <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
      <v-container>
        <v-file-input
          v-model="received_file"
          label="Import issued goods*"
          :rules="[v => !!v || 'FIle is required']"
          required
        ></v-file-input>
      </v-container>

      <div class="text-center mt-3">
        <v-btn
          dark
          color="cyan accent-6"
          :loading="btn_loading"
          rounded
          @click="importIssued"
        >IMPORT</v-btn>
      </div>
    </v-form>-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      btn_loading: false,
      file: null,
      received_file: null
    };
  },
  methods: {
    takeBackup() {
      console.log(this.$route)
        let win=  window.open('http://127.0.0.1:8000/take_backup','_blank');
      win.focus();
    },
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("/api/import", formData)
        .then(response => {
          console.log(response.data);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
          console.log(error.response.data);
        });
    },
    importReceive() {
      this.btn_loading = true;
      let formData = new FormData();
      formData.append("file", this.received_file);
      axios
        .post("/api/import_received", formData)
        .then(response => {
          console.log(response.data);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
          console.log(error.response.data);
        });
    },
    importIssued() {
      this.btn_loading = true;
      let formData = new FormData();
      formData.append("file", this.received_file);
      axios
        .post("/api/import_issued", formData)
        .then(response => {
          console.log(response.data);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
          console.log(error.response.data);
        });
    },

    importPrev() {
      this.btn_loading = true;
      let formData = new FormData();
      formData.append("file", this.received_file);
      axios
        .post("/api/prev_data_import", formData)
        .then(response => {
          console.log(response.data);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
          console.log(error.response.data);
        });
    }
  },
  created() {}
};
</script>