<template>
  <div class="home">
    <h1>Cube-7</h1>
    <Login />
    <Test />
  </div>
</template>

<script>
import Login from "@/components/common/auth/Login.vue";
import Test from "@/components/common/test/Test.vue";

export default {
  name: "Home",
  components: {
    Login,
    Test
  }
};
</script>
