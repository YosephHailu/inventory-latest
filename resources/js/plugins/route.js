import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import { routes } from "./routes.js";
import { hasRole } from "../helper/role";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: "/",
    routes: routes,

    //force newly opened pages to scroll back to the top
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

router.beforeEach(function(to, from, next) {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        store.state.mainStore.loading = true;
        if (!store.state.mainStore.auth.logged_in && to.name != "login") {
            next("/login");
        }
        console.log("route", checkRole(to.meta.roles || []));

        if (!checkRole(to.meta.roles || [])) {
            next("/");
        }
    }
    next();
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    store.state.mainStore.loading = false;
});

function checkRole(roles) {
    if (roles.length < 1 || store.state.mainStore.auth.user.role == "administrator") return true;
    return hasRole(roles, store.state.mainStore.auth.user.role);
}

export default router;
