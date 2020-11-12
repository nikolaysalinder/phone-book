<template>
  <div class="container">
    <div class="users">
      <table style="width: 100%" class="table">
        <tr>
          <th class="table__head">ID</th>
          <th class="table__head">Аватар</th>
          <th class="table__head">Фамилия</th>
          <th class="table__head">Имя</th>
          <th class="table__head">E-mail</th>
          <th class="table__head">Телефон</th>
        </tr>
        <tr class="table__row" v-for="user in users" :key="user.id">
          <td class="table__cell">{{ user.id }}</td>
          <td class="table__cell">
            <img
              :src="user.avatar"
              alt="avatar"
              class="users__image"
              height="50px"
              width="50px"
            />
          </td>
          <td class="table__cell">{{ user.lastName }}</td>
          <td class="table__cell">{{ user.firstName }}</td>
          <td class="table__cell">{{ user.email }}</td>
          <td class="table__cell">{{ user.phone }}</td>
          <td class="table__cell">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </td>
        </tr>
      </table>
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
    return {};
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
  &__id {
    visibility: hidden;
  }
  &__head {
    text-align: left;
    &:nth-child(2) {
      text-align: center;
    }
  }
  &__row {
  }
  &__cell {
    padding-left: 10px;
    padding-right: 10px;
    &:first-child {
      width: 50px;
      font-size: 14px;
      color: #797979;
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:last-child {
      width: 90px;
    }
  }
}
.users {
  &__item {
    border-bottom: 2px solid #ccc;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
  }
  &__image {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
</style>
