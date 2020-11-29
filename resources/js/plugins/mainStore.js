import { getLocalUser, getLocalRoles, getLocalConfig } from "../helper/auth";

const local_auth = getLocalUser();
const local_config = getLocalConfig();
const roles = getLocalRoles();

const state = {
    drawerToggler: true,
    loading: true,
    sidebar_panel: true,
    config: local_config,
    auth: local_auth,
    alert: {
        message: "",
        visible: false,
        type: "success"
    }
};

const getters = {
    getActivePanel: state => state.sidebar_panel,
    getAlert: state => state.alert,
    getDrawerToggler: state => state.drawerToggler,
    getLoading: state => state.loading,
    getAuth: state => state.auth,
    getConfig: state => state.config
};

const actions = {
    updateActivePanel({ commit }, value) {
        commit("setActivePanel", value);
    },

    updateDrawerToggler({ commit }, value) {
        commit("setDrawerToggler", value);
    },

    updateLoading({ commit }, value) {
        commit("setLoading", value);
    },

    updateAlert({ commit }, payload) {
        commit("setAlert", payload);
    }
};

const mutations = {
    setAlert: (state, payload) => {
        state.alert = payload;
    },

    setActivePanel: (state, value) => {
        state.sidebar_panel = value;
    },

    setDrawerToggler: (state, value) => {
        state.drawerToggler = value;
    },

    setLoading: (state, value) => {
        state.loading = value;
    },

    updateConfig: (state, payload) => {
        state.config = payload.config;
        localStorage.setItem("local_config", JSON.stringify(state.config));
    },

    updateUser: (state, payload) => {
        state.auth.logged_in = payload.logged_in;
        state.auth.user = payload.user;
        localStorage.setItem("local_auth", JSON.stringify(state.auth));
    },

    logout: (state, payload) => {
        state.auth.logged_in = payload.logged_in;
        localStorage.setItem("local_auth", JSON.stringify(state.auth));
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
