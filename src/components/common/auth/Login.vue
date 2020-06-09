<template>
  <div class="login-form">
    <div v-if="isEmailShown">{{ this.userEmail }}</div>
    <div v-if="!isEmailShown">
      <h5>
        <span v-on:click="showLogin">Login</span>
        |
        <span v-on:click="showRegister">Register</span>
      </h5>
      <div>
        <label>e-mail</label>
        <input
          class="login__email"
          v-model="email"
        />
      </div>
      <div>
        <label>password</label>
        <input
          class="login__password"
          type="password"
          v-model="password"
        />
      </div>
      <div v-if="isRegisterShown">
        <label>repeat password</label>
        <input
          class="login__password"
          type="password"
          v-model="password2"
        />
      </div>
      <button
        class="login__submit"
        v-on:click="login"
        v-if="!isRegisterShown"
      >ok</button>
      <button
        class="login__submit"
        v-on:click="register"
        v-if="isRegisterShown"
      >register</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Model } from "vue-property-decorator"
import authService from "@/services/auth"

@Component
export default class Login extends Vue {
  email = ''
  password = ''
  password2 = ''
  isLogedin = false
  isRegisterShown = false
  isEmailShown = false
  userEmail = ''

  @Emit('login')
  login() {
    // send info to auth server
  }

  @Emit('register')
  register() {
    // send info to auth server
  }

  @Emit('showRegister')
  showRegister() {
    this.isRegisterShown = true
  }
  @Emit('showLogin')
  showLogin() {
    this.isRegisterShown = false
  }

  beforeMount() {
    if (!authService.isTokenExpired()) {
      this.isEmailShown = true
      this.userEmail = authService.getEmail()
    }
  }
}
</script>

<style scoped lang="less">
.login-form {
  position: absolute;
  top: 0;
  right: 0;
  width: 110px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #c3c3c3;
}
.login__email,
.login__password {
  width: 90%;
}
.login__submit {
  margin-top: 10px;
}
</style>
