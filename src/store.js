import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem("idToken") || null,
    userId: null,
    users: null,
    editedUser: null,
  },
  mutations: {
    AUTH_USER(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    },
    STORE_EDITED_USER(state, user) {
      state.editedUser = user;
    },
    STORE_USERS(state, users) {
      state.users = users;
    },
    CLEAR_AUTH_DATA(state) {
      state.idToken = null;
      state.userId = null;
    },
    DELETE_USER(state, user) {
      const index = state.users.findIndex((usr) => usr.id === user.id);
      state.users.splice(index, 1);
    },
  },
  actions: {
    updateUser({ state }, user) {
      const userId = user.id;
      delete user.id;
      axios
        .patch(
          "https://phone-book-ca240.firebaseio.com/users/" +
            userId +
            ".json" +
            "?auth=" +
            state.idToken,
          user
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    deleteUser({ commit, state }, user) {
      axios
        .delete(
          "https://phone-book-ca240.firebaseio.com/users/" +
            user.id +
            ".json" +
            "?auth=" +
            state.idToken,
          user
        )
        .then((res) => {
          console.log(res.data);
          if (!res.data) {
            commit("DELETE_USER", user);
          }
        })
        .catch((err) => console.log(err));
    },
    signup({ commit }, authData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyQ2rarIGADucWtmuFX5kGKx10ZhtSiFo",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);

          localStorage.setItem("idToken", res.data.idToken);

          commit("AUTH_USER", {
            idToken: res.data.idToken,
            userId: res.data.localId,
          });

          router.push("/contacts");
        })
        .catch((error) => console.log(error));
    },
    logout({ commit }) {
      commit("CLEAR_AUTH_DATA");
      delete localStorage["idToken"];
      router.push("/login");
    },
    login({ commit }, authData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyQ2rarIGADucWtmuFX5kGKx10ZhtSiFo",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          localStorage.setItem("idToken", response.data.idToken);

          commit("AUTH_USER", {
            idToken: response.data.idToken,
            userId: response.data.localId,
          });
          router.push("/contacts");
        })
        .catch((error) => console.log(error));
    },
    storeUser({ state }, userData) {
      if (!state.idToken) {
        return;
      }
      axios
        .post(
          "https://phone-book-ca240.firebaseio.com/users.json" +
            "?auth=" +
            state.idToken,
          userData
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    fetchUsers({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      axios
        .get(
          "https://phone-book-ca240.firebaseio.com/users.json" +
            "?auth=" +
            state.idToken
        )
        .then((res) => {
          console.log("--------->", res.data);
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log("<-------", users);
          commit("STORE_USERS", users);
        });
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    getEditedUser(state) {
      return state.editedUser;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
  },
});
