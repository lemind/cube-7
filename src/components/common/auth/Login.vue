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
  errors: errorsType = {
    email: [],
    password: [],
    password2: []
  }

  get storeUser() {
    return this.$store.getters['user']
  }

  get userEmail() {
    return this.storeUser && this.storeUser.email
  }

  get isEmailShown() {
    return !!this.storeUser
  }

  login() {
    const user = {
      email: this.email,
      password: this.password,
    }
    store.dispatch('login', user)
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
    // ToDo: get it back after token saving to LocalStorage added
    // if (!authService.isTokenExpired()) {
    //   this.isEmailShown = true
    //   this.userEmail = authService.getEmail()
    // }
  }

  handleBlurEmail() {
    if (!validateEmail(this.email)) {
      this.addError('email', invalidEmail)
    } else {
      this.deleteError('email', invalidEmail)
    }
  }

  // ToDo: move to helpers?
  addError(fieldName, errorMessage) {
    this.errors[fieldName].push(errorMessage)
    this.errors[fieldName] = [...new Set(this.errors[fieldName])]
  }

  deleteError(fieldName, errorMessage) {
    this.errors[fieldName] = [...this.errors[fieldName].filter(err => err !== errorMessage)] 
  }

  checkPasswordsEquality() {
    if (!this.isRegisterShown) return

    if (this.password !== this.password2) {
      this.addError('password', notEqualPasswords)
      this.addError('password2', notEqualPasswords)
    } else {
      this.deleteError('password', notEqualPasswords)
      this.deleteError('password2', notEqualPasswords)
    }
  }

  handleBlurPassword() {
    if (!this.password2) return

    this.checkPasswordsEquality()
  }

  handleBlurPassword2() {
    this.checkPasswordsEquality()
  }

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

  isSubmitDisabled() {
    // ToDo: show empty field warning
    // messy
    if (this.isRegisterShown) {
      if (!this.email || !this.password || !this.password2) {
        return true
      }
    } else {
      if (!this.email || !this.password) {
        return true
      }
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
