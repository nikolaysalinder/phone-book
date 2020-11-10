<template>
  <el-form :label-position="labelPosition" label-width="100px">
    <el-form-item label="Аватар">
      <el-input v-model="form.avatar"></el-input>
    </el-form-item>
    <el-form-item label="Фамилия">
      <el-input v-model="form.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Имя">
      <el-input v-model="form.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Отчество">
      <el-input v-model="form.middleName"></el-input>
    </el-form-item>
    <el-form-item label="Телефон">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Добавить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        avatar: "",
        lastName: "",
        firstName: "",
        middleName: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("storeUser", {
        avatar: this.form.avatar,
        lastName: this.form.lastName,
        firstName: this.form.firstName,
        middleName: this.form.middleName,
        phone: this.form.phone,
      });
    },
  },
  computed: {
    email() {
      return this.$store.state.userId;
    },
  },
};
</script>
