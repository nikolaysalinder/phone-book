<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item v-if="!auth" index="1">
            <router-link to="/">Login</router-link>
          </el-menu-item>
          <el-menu-item v-if="!auth" index="2">
            <router-link to="/registration">Registration</router-link>
          </el-menu-item>
          <el-menu-item v-if="auth" index="3">
            <router-link to="/contacts">Contacts</router-link>
          </el-menu-item>
          <el-menu-item v-if="auth" index="4">
            <router-link to="/newuser">New User</router-link>
          </el-menu-item>

          <el-button v-if="auth" type="primary" @click="logout()"
            >Logout</el-button
          >
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style></style>
