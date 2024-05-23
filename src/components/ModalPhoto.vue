<script setup>
import { defineProps } from "vue";
defineEmits(['close'])
const { photo } = defineProps(["photo"]);
</script>

<template>
  <div class="modal">
    <button type="button" class="btn-close" @click="$emit('close')">
      <span class="icon-cross"></span>
      <span class="visually-hidden">Close</span>
    </button>
    <img :src="photo.baseUrl" class="modal-content" />
  </div>
</template>

<style scoped lang="scss">

@keyframes swirl {
  0% {
    transform: rotateY(270deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

img {
  height: 200%;
  object-fit: contain;
}

.modal {
  overflow: auto;
  position: relative;
  animation: swirl 0.2s ease-out; /* Add the animation */
}

.modal-content {
  max-width: 100%;
  max-height: 100%;
}

@mixin cross($size: 20px, $color: currentColor, $thickness: 1px) {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  position: relative;
  width: $size;
  height: $size;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: ($size - $thickness) / 2;
    left: 0;
    right: 0;
    height: $thickness;
    background: $color;
    border-radius: $thickness;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  span {
    display: block;
  }
}

.btn-close {
  position: absolute;
  top: 10px;
  left: 10px;
  margin: 0;
  border: 0;
  padding: 0;
  background: hsl(216, 100, 50);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms;

  .icon-cross {
    @include cross(12px, #fff, 3px);
  }

  &:hover,
  &:focus {
    transform: rotateZ(90deg);
    background: hsl(216, 100, 40);
  }
}

.visually-hidden {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0 !important;
  border: 0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
}
</style>
