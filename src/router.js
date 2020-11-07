import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Contacts from "./views/Contacts.vue";
import Registration from "./views/Registration.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.user) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
