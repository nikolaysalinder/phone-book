<template>
  <transition name="modal">
    <div class="modal__mask" @click.self="$emit('close')">
      <div class="modal__wrapper" @click.self="$emit('close')">
        <div class="modal__container">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
            :label-position="'top'"
          >
            <el-form-item label="Аватар URL" prop="imgUrl">
              <el-input
                type="text"
                v-model="ruleForm.imgUrl"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Фамилия" prop="lastName">
              <el-input
                type="text"
                v-model="ruleForm.lastName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Имя" prop="firstName">
              <el-input v-model="ruleForm.firstName"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input id="email" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Телефон" prop="phone">
              <el-input id="phone" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Отправить</el-button
              >
              <el-button @click="resetForm('ruleForm')">Сбросить</el-button>
            </el-form-item>
            <a class="modal__button-close" @click.prevent="$emit('close')"
              >Закрыть</a
            >
          </el-form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    const isImgUrl = (imgUrl) => {
      return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(imgUrl);
    };
    var validateImgUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Введите url картинки"));
      } else if (!isImgUrl(value)) {
        callback(new Error("Введите картинку формате .jpg, .png, .gif"));
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

          setTimeout(() => {
            this.$router.go();
          }, 1000);
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
<style lang="scss">
.modal {
  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    display: table;
  }
  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  &__container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    position: relative;
  }
  &__button-close {
    display: block;
    font-size: 0;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    &:before {
      content: "";
      display: block;
      height: 2px;
      width: 100%;
      background: #409eff;
      position: absolute;
      top: 50%;
      transform: rotate(45deg);
    }
    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 100%;
      background: #409eff;
      position: absolute;
      top: 50%;
      transform: rotate(-45deg);
    }
  }
}
</style>
