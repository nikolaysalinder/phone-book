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
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    },
    storeUsers(state, users) {
      state.users = users;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    },
    deleteUser(state, user) {
      const index = state.users.findIndex((usr) => usr.id === user.id);
      state.users.splice(index, 1);
      axios
        .delete(
          "https://phone-book-ca240.firebaseio.com/users/" +
            user.id +
            ".json" +
            "?auth=" +
            state.idToken
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
  actions: {
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
        .then((response) => {
          console.log(response);

          localStorage.setItem("idToken", response.data.idToken);

          commit("authUser", {
            idToken: response.data.idToken,
            userId: response.data.localId,
          });
          // dispatch("storeUser", authData);
          router.push("/");
        })
        .catch((error) => console.log(error));
    },
    logout({ commit }) {
      commit("clearAuthData");
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
          console.log(response);

          localStorage.setItem("idToken", response.data.idToken);

          commit("authUser", {
            idToken: response.data.idToken,
            userId: response.data.localId,
          });
          router.push("/");
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
          commit("storeUsers", users);
        });
    },
  },
  getters: {
    users: (state) => {
      return state.users;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    filterUserByLastname(state, getters, lastName) {
      return getters.users.find((user) => user.lastName == lastName);
    },
  },
});
