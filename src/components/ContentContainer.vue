<template>
    <div class="content-container">
        <slot></slot>
    </div>
</template>
<style scoped>
.content-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  justify-content: space-between;
  background-color: #8a2be2;
  border-radius: 30px;
  padding: 20px;
  align-items: center;
  align-content: center;
}

.content-container > * {
  margin-bottom: 20px;
}
</style>
