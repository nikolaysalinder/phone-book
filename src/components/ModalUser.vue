<template>
  <transition name="modal">
    <div class="modal__mask" @click.self="$emit('close')">
      <div class="modal__wrapper" @click.self="$emit('close')">
        <div class="modal__container">
          <el-form :label-position="labelPosition" label-width="100px">
            <el-form-item label="Аватар Url">
              <el-input id="imgUrl" v-model="form.imgUrl"></el-input>
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
      this.$emit("close");
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
