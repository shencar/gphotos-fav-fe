<script setup>
import { defineProps } from "vue";
const { title, subtitle } = defineProps(["title", "subtitle"]);
</script>
<template>
    <header>
        <h1>{{ title }}</h1>
        <h4>{{ subtitle }}</h4>
        <slot></slot>
    </header>
</template>
<style scoped>
header {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header h1 {
  font-weight: bold;
  margin-right: 30px;
  font-size: 80px;
}

header h4 {
  margin-right: 30px;
  font-size: 40px;
}

</style>
