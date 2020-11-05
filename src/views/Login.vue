<template>
  <div class="container">
    <h1>login</h1>
    <form class="form" @submit.prevent="login">
      <label for="">Ваш логин</label>
      <input v-model="email" type="text" />
      <label for="">Ваш пароль</label>
      <input v-model="password" type="password" />
      <button>отправить</button>
    </form>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      store.user = this.email;
      this.$router.push("/contacts");
    },
  },
};
</script>

<style>
.form {
  width: 360px;
  padding: 20px;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>
