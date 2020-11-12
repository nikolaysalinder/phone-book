<template>
  <el-form :label-position="labelPosition" label-width="100px">
    <el-form-item label="Аватар Url">
      <el-input id="imgUrl" required v-model="form.imgUrl"></el-input>
    </el-form-item>
    <el-form-item label="Фамилия">
      <el-input id="lastName" v-model="form.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Имя">
      <el-input id="firstName" v-model="form.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input id="email" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Телефон">
      <el-input id="phone" v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button id="buttonSubmit" type="primary" @click="submitForm()"
        >Добавить</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        imgUrl: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("storeUser", {
        avatar: this.form.imgUrl,
        lastName: this.form.lastName,
        firstName: this.form.firstName,
        email: this.form.email,
        phone: this.form.phone,
      });
      this.form.imgUrl = "";
      this.form.lastName = "";
      this.form.firstName = "";
      this.form.email = "";
      this.form.phone = "";
    },
  },
  computed: {},
};
</script>
