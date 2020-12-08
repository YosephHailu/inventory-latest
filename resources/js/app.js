/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web   applications using Vue and laravel.

 */

require("./bootstrap");
require("./custom.scss");

import store from "./plugins/store";
import router from "./plugins/route";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Trend from "vuetrend"
import Bars from 'vuebars'

window.Vue = require("vue");

Vue.use(Trend);
Vue.use(Bars);
Vue.use(VueAxios, axios);

window.axios.defaults.headers.common = {
    "X-CSRF-TOKEN": window.Laravel.csrfToken,
    "X-Requested-With": "XMLHttpRequest"
};

axios.interceptors.request.use(
    function(config) {
        store.state.mainStore.loading = true;
        return config;
    },
    function(error) {
        store.state.mainStore.loading = false;
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response) {
        store.state.mainStore.loading = false;
        return response;
    },
    function(error) {
        store.state.mainStore.loading = false;
        return Promise.reject(error);
    }
);

const app = new Vue({
    render: h => h(App),
    vuetify,
    router,
    store,
    el: "#app"
});
