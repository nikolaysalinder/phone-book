<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1">
            <router-link id="logoLink" class="nav__link" to="/">
              <img
                height="40px"
                width="40px"
                src="phone.svg"
                alt=""
                class="logo"
              />
            </router-link>
          </el-menu-item>
          <el-menu-item class="nav__el" v-if="!auth" index="2">
            <router-link class="nav__link" to="/login">Login</router-link>
          </el-menu-item>
          <el-menu-item class="nav__el" v-if="!auth" index="3">
            <router-link class="nav__link" to="/registration"
              >Registration</router-link
            >
          </el-menu-item>
          <el-menu-item class="nav__el" v-if="auth" index="4">
            <router-link class="nav__link" to="/contacts">Contacts</router-link>
          </el-menu-item>
          <el-menu-item class="nav__el" v-if="auth" index="5">
            <router-link id="newUser" class="nav__link" to="/newuser"
              >New User</router-link
            >
          </el-menu-item>

          <el-button
            class="logout__btn"
            v-if="auth"
            type="primary"
            @click="logout()"
            >Logout</el-button
          >
        </el-menu>
      </el-header>
      <el-main>
        <transition name="route" mode="out-in">
          <router-view />
        </transition>
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

<style lang="scss">
button.logout__btn {
  margin-top: 10px;
  margin-left: 50px;
}
.el-menu-item.nav__el {
  padding-left: 0px;
  padding-right: 0px;
}
.nav__link {
  display: block;
  padding: 0 20px;
}
.route-enter-from {
}
.route-enter-active {
  animation: slide-from-bottom 0.5s ease-out;
}
.route-enter-to {
}
.route-leave-active {
  animation: slide-to-top 0.5s ease-in;
}
@keyframes slide-to-top {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(-150px) scale(1);
    opacity: 0;
  }
}
@keyframes slide-from-bottom {
  0% {
    transform: translateY(150px);
    opacity: 0;
  }

  50% {
    transform: translateY(50px);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
