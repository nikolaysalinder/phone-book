import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Contacts from "./views/Contacts.vue";
import NewUser from "./views/NewUser.vue";
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
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/newuser",
      name: "newuser",
      component: NewUser,
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.user) {
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
