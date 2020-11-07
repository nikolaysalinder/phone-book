<template>
  <el-container>
    <h1>registraton</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
          {
            required: true,
            message: 'Пожалуйста введите email',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Пожалуйста введите верный email',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="Пароль" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Второй раз" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Пожалуйста, введите пароль"));
      } else if (value.length < 6) {
        callback(new Error("Минимум 6 символов"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Повторите пароль"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Пароли не совпадают!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post(
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyQ2rarIGADucWtmuFX5kGKx10ZhtSiFo",
              {
                email: this.ruleForm.email,
                password: this.ruleForm.pass,
                returnSecureToken: true,
              }
            )
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style type="text/css"></style>
