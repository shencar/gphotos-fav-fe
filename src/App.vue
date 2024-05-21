<script setup>
import { RouterView } from "vue-router";
import { GoogleLogin, decodeCredential } from "vue3-google-login";
import { ref } from "vue";

const user = ref(null);
const loggedIn = sessionStorage.getItem("credentials") ? ref(true) : ref(false);

const callback = (response) => {
  user.value = decodeCredential(response.credential);
  loggedIn.value = true;
  sessionStorage.setItem("credentials", response.credential);
  console.log("response", user.value);
};
</script>

<template>
  <body>
    <div class="container" v-if="loggedIn">
      <RouterView />
    </div>
    <div class="login-container" v-else>
      <GoogleLogin :callback="callback" prompt></GoogleLogin>
    </div>
  </body>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
