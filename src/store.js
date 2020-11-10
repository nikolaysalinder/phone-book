import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
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
  },
  actions: {
    signup({ commit, dispatch }, authData) {
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
          commit("authUser", {
            idToken: response.data.idToken,
            userId: response.data.localId,
          });
          dispatch("storeUser", authData);
        })
        .catch((error) => console.log(error));
    },
    logout({ commit }) {
      commit("clearAuthData");
      router.push("/");
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
          commit("authUser", {
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
    fetchUser({ commit, state }) {
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
          console.log("---------", res.data);
          // const data = res.data;
          const users = res.data;
          // for (let key in data) {
          //   const user = data[key];
          //   user.id = key;
          //   users.push(user);
          //   console.log(users);
          commit("storeUsers", users);
          // }
        });
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
  },
});
