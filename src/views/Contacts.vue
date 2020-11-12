<template>
  <div class="container">
    <div class="users">
      <ul class="table">
        <li class="table__row">
          <div class="table__head">ID</div>
          <div class="table__head">Аватар</div>
          <div class="table__head">Фамилия</div>
          <div class="table__head">Имя</div>
          <div class="table__head">E-mail</div>
          <div class="table__head">Телефон</div>
        </li>
        <li class="table__row">
          <el-button class="table__add-user" type="primary"
            >Добавить контакт</el-button
          >
        </li>
        <transition-group name="user-list">
          <li class="table__row" v-for="user in users" :key="user.id">
            <div class="table__cell">{{ user.id }}</div>
            <div class="table__cell">
              <img
                :src="
                  user.avatar
                    ? user.avatar
                    : 'https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg'
                "
                class="users__image"
                height="40px"
                width="40px"
              />
            </div>
            <div class="table__cell">{{ user.lastName }}</div>
            <div class="table__cell">{{ user.firstName }}</div>
            <div class="table__cell">{{ user.email }}</div>
            <div class="table__cell">{{ user.phone }}</div>
            <div class="table__cell">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button
                @click="removeUser(user)"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </div>
          </li>
        </transition-group>
      </ul>
      <!--  <div>
        <div class="users__lastname">{{ user.lastName }}</div>
        <div class="users__firstname">{{ user.firstName }}</div>
        <div class="users__middlename">{{ user.middleName }}</div>
        <div class="users__phone">{{ user.phone }}</div>
        <div class="users__actioins">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        imgUrl: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    removeUser(user) {
      this.$store.commit("deleteUser", user);
    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  created() {
    this.$store.dispatch("fetchUsers");
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  &__head {
    padding: 10px 20px;
    font-weight: bold;
    box-sizing: border-box;
    &:first-child {
      width: 190px;
      text-align: center;
    }
    &:nth-child(2) {
      text-align: center;
      width: 70px;
      padding-left: 0;
      padding-right: 0;
    }
    &:nth-child(3) {
      text-align: center;
      width: 140px;
    }
    &:nth-child(4) {
      text-align: left;
      width: 140px;
    }
    &:nth-child(4) {
      text-align: left;
      width: 140px;
    }
    &:nth-child(5) {
      text-align: left;
      width: 200px;
    }
  }
  &__row {
    display: flex;
    width: 100%;
    &:nth-child(2n) {
      background: #f1f1f1;
    }
    &--new-user {
      padding-left: 120px;
    }
  }
  &__add-user {
    display: block;
    box-sizing: border-box;
    padding: 10px 20px;
    width: 100%;
  }
  &__cell {
    padding: 10px;

    box-sizing: border-box;
    height: 60px;
    line-height: 40px;
    &:first-child {
      width: 200px;
      font-size: 14px;
      color: #797979;
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: left;
      width: 140px;
      padding-left: 30px;
    }
    &:nth-child(4) {
      text-align: left;
      width: 140px;
      padding-left: 20px;
    }
    &:nth-child(5) {
      text-align: left;
      min-width: 200px;
      padding-left: 10px;
    }
    &:nth-child(6) {
      text-align: left;
      min-width: 130px;
      padding-left: 10px;
    }
    &:nth-child(7) {
      display: flex;
      text-align: left;
      min-width: 110px;
      padding-left: 10px;
    }
  }
}
.new-user {
  &__input {
    padding-top: 4px;
  }
}
.users {
  width: 1000px;
  margin: 0 auto;
  &__image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
}
.user-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.user-list-enter-active {
  transition: all 1s ease-out;
}
.user-list-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.user-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.user-list-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
}
.user-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.user-list-move {
  transition: transform 0.8s ease;
}
</style>
