<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Аватар URL" prop="imgUrl">
      <el-input
        id="imgUrl"
        type="text"
        v-model="ruleForm.imgUrl"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="Фамилия" prop="lastName">
      <el-input
        id="lastName"
        type="text"
        v-model="ruleForm.lastName"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="Имя" prop="firstName">
      <el-input id="firstName" v-model="ruleForm.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input id="email" v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Телефон">
      <el-input id="phone" v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        id="buttonSubmit"
        type="primary"
        @click="submitForm('ruleForm')"
        >Submit</el-button
      >
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    const isImgUrl = (imgUrl) => {
      return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(imgUrl);
    };
    var validateImgUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the url"));
      } else if (!isImgUrl(value)) {
        callback(new Error("PLs input image url"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        imgUrl: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
      },
      rules: {
        imgUrl: [{ validator: validateImgUrl, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("storeUser", {
            imgUrl: this.ruleForm.imgUrl,
            lastName: this.ruleForm.lastName,
            firstName: this.ruleForm.firstName,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone,
          });
          this.ruleForm.imgUrl = "";
          this.ruleForm.lastName = "";
          this.ruleForm.firstName = "";
          this.ruleForm.email = "";
          this.ruleForm.phone = "";
          this.$emit("close");
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
