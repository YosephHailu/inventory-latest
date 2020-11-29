import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
window.Axios = require("axios").default;

Vue.use(VueAxios, axios);

Axios.interceptors.request.use(
    function(config) {
        store.state.mainStore.loading = true;
        return config;
    },
    function(error) {
        store.state.mainStore.loading = false;
        return Promise.reject(error);
    }
);
