<template>
  <div>
    <button
      class="testButton"
      v-on:click="makeTest"
    >Ping</button>

    <div class="testResult">
      {{ this.result }}
    </div>

    <div class="testError">
      {{ this.errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Model } from "vue-property-decorator"
import store from '@/store'

@Component
export default class Login extends Vue {
  makeTest() {
    store.dispatch('test')
  }

  get errorMessage() {
    const error = this.$store.getters['testError']
    return error ? error.message : ''
  }

  get result() {
    return this.$store.getters['test']
  }
}
</script>

<style scoped lang="less">
.testButton {
  margin-bottom: 10px;
}
.testResult {
  color: #42b983;
}
.testError {
  color: #b95d42;
}
</style>
