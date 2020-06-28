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
          v-on:blur="handleBlurEmail"
        />
        <div class="login__error" v-for="error in this.errors.email" :key="error">
          {{ error }}
        </div>
      </div>
      <div>
        <label>password</label>
        <input
          class="login__password"
          type="password"
          v-model="password"
          v-on:blur="handleBlurPassword"
        />
        <div class="login__error" v-for="error in this.errors.password" :key="error">
          {{ error }}
        </div>
      </div>
      <div v-if="isRegisterShown">
        <label>repeat password</label>
        <input
          class="login__password"
          type="password"
          v-model="password2"
          v-on:blur="handleBlurPassword2"
        />
        <div class="login__error" v-for="error in this.errors.password2" :key="error">
          {{ error }}
        </div>
      </div>
      <button
        class="login__submit"
        v-on:click="login"
        v-if="!isRegisterShown"
        :disabled="isSubmitDisabled()"
      >ok</button>
      <button
        class="login__submit"
        v-on:click="register"
        v-if="isRegisterShown"
        :disabled="isSubmitDisabled()"
      >register</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Model } from "vue-property-decorator"
import authService from "@/services/auth"
import store from '@/store'

// ToDo: move to validators
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// ToDo: move to err messages
const invalidEmail = 'Email should be valid'
const notEqualPasswords = 'Passwords should be equal'

type errorsType = {
  email: Array<string>
  password: Array<string>
  password2: Array<string>
}

@Component
export default class Login extends Vue {
  email = ''
  password = ''
  password2 = ''
  isLogedin = false
  isRegisterShown = false
  isEmailShown = false
  userEmail = ''
  errors: errorsType = {
    email: [],
    password: [],
    password2: []
  }

  login() {
    console.log('__send info to auth server__');
  }

  register() {
    const newUser = {
      email: this.email,
      password: this.password,
      password2: this.password2
    }
    store.dispatch('register', newUser)
  }

  showRegister() {
    this.isRegisterShown = true
  }
  showLogin() {
    this.isRegisterShown = false
  }

  beforeMount() {
    if (!authService.isTokenExpired()) {
      this.isEmailShown = true
      this.userEmail = authService.getEmail()
    }
  }

  //ToDo: DRY
  handleBlurEmail() {
    if (!validateEmail(this.email)) {
      this.errors.email.push(invalidEmail)
      this.errors.email = [...new Set(this.errors.email)];
    } else {
      this.errors.email = [...this.errors.email.filter(err => err !== invalidEmail)]
    }
  }

  //ToDo: DRY
  checkPasswordsEquality() {
    if (this.password !== this.password2) {
      this.errors.password.push(notEqualPasswords)
      this.errors.password2.push(notEqualPasswords)
      this.errors.password = [...new Set(this.errors.password)];
      this.errors.password2 = [...new Set(this.errors.password2)];
    } else {
      this.errors.password = [...this.errors.password.filter(err => err !== notEqualPasswords)]
      this.errors.password2 = [...this.errors.password2.filter(err => err !== notEqualPasswords)]
    }
  }

  handleBlurPassword() {
    if (!this.password2) return

    this.checkPasswordsEquality()
  }

  handleBlurPassword2() {
    this.checkPasswordsEquality()
  }

  @Prop()
  doesFormHaveErrors() {
    let errorsCount = 0;
    for (const field in this.errors) {
      if (this.errors[field].length > 0) {
        errorsCount++
        break
      }
    }

    return !!errorsCount
  }

  @Prop()
  isSubmitDisabled() {
    // ToDo: show empty field warning
    if (!this.email || !this.password || !this.password2) {
      return true
    }

    return this.doesFormHaveErrors()
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
.login__error {
  color: #b22222;
}
</style>
