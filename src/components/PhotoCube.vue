<script setup>
import { defineProps } from "vue";

const { imgSrc, title, subtitle } = defineProps([
  "imgSrc",
  "title",
  "subtitle",
]);

const includeText = Boolean(title) || Boolean(subtitle);
console.log("includeText", includeText);
</script>
<template>
  <div class="photo-cube-container">
    <img :src="imgSrc" alt="" />
    <div class="photo-cube-text" v-if="includeText">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped>
.photo-cube-container {
  height: 300px;
  width: 300px;
  overflow: hidden;
  position: hidden;
  border-radius: 7%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 35px; */
  /* margin-right: 20px; */
  /* margin-left: 20px; */
  cursor: pointer;
  /* flex: 0 0 20%; */
  background-color: white;
  transition: background-color 0.3s;
}

.photo-cube-container:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
  background-color: #FFE45E;
}

.photo-cube-container img {
  width: 100%;
  height: 70%;
  object-fit: cover;
  object-position: center;
}

.photo-cube-container .photo-cube-text {
  text-align: center;
  max-height: 10px;
  padding: 0 5px;
}

.photo-cube-container .photo-cube-text h2 {
  font-weight: bold;
}
</style>
