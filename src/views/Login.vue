<template>
  <el-container>
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
        <el-input id="email" v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item
        label="Пароль"
        prop="pass"
        :rules="[
          {
            required: true,
            message: 'Пожалуйста введите пароль',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          id="pass"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          id="loginButton"
          type="primary"
          @click="submitForm('ruleForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
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
          this.$store
            .dispatch("login", {
              email: this.ruleForm.email,
              password: this.ruleForm.pass,
            })
            .catch((err) => {
              console.log(err);
            });
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
