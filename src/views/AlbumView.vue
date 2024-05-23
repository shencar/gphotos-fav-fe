<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStorage } from "@vueuse/core";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ContentContainer from "../components/ContentContainer.vue";
import HeaderContainer from "../components/HeaderContainer.vue";
const route = useRoute();
const albumId = route.params.id;
const isLoaded = ref(false);
const photos = ref([]);
const albums = useStorage("albums", []);
const albumMeta = albums.value.find((album) => album.id === albumId);
const showModal = ref(false);
const modalPhoto = ref(null);

onMounted(() => {
  axios.get("/api/albums/" + albumId + "/favorites").then((res) => {
    isLoaded.value = true;
    photos.value = res.data.mediaItems;
    console.log('photos', photos.value)
  });
});

function openModal(photo) {
  modalPhoto.value = photo;
  showModal.value = true;
}
function closeModal(photo) {
  modalPhoto.value = null;
  showModal.value = false;
}
</script>

<template>
  <div v-if="isLoaded">
    <HeaderContainer
      :title="albumMeta.title"
      :subtitle="`Your Favorite Photos`"
    ></HeaderContainer>
    <ContentContainer>
      <div v-if="showModal" class="modal-backdrop">
        <div class="modal">
          <button type="button" class="btn-close" @click="closeModal">
            <span class="icon-cross"></span>
            <span class="visually-hidden">Close</span>
          </button>
          <img :src="modalPhoto.baseUrl" class="modal-content" />
        </div>
      </div>
      <div class="photo-grid">
        <ul>
          <li v-for="photo in photos">
            <img :src="photo?.baseUrl" @click="openModal(photo)" />
          </li>
        </ul>
      </div>
    </ContentContainer>
  </div>

  <LoadingSpinner v-else>Loading</LoadingSpinner>
</template>

<style scoped lang="scss">
.photo-grid ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 50px;
}

.photo-grid li {
  height: 40vh;
  flex-grow: 1;
  padding: 5px;
}

.photo-grid li:last-child {
  flex-grow: 10;
}

.photo-grid img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: center;
  border-radius: 4%;
  transition: border-color 0.3s; /* Adding transition for smooth effect */
  cursor: pointer;
}
.photo-grid img:hover {
  border: 2px solid; /* Adding yellow border on hover */
}

@media (max-aspect-ratio: 1/1) {
  .photo-grid li {
    height: 30vh;
  }
}

@media (max-height: 480px) {
  .photo-grid li {
    height: 80vh;
  }
}

@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  .photo-grid ul {
    flex-direction: row;
  }

  .photo-grid li {
    height: auto;
    width: 100%;
  }
  .photo-grid img {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  // z-index: 9999; /* Ensure the modal is on top */
}

@keyframes swirl {
  0% {
    transform: rotateY(270deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.modal {
  background-color: #fff;
  overflow: auto;
  position: relative;
  animation: swirl 0.2s ease-out; /* Add the animation */;

}

.modal-content {
  max-width: 100%;
  max-height: 100%;
}


// Display a cross with CSS only.
//
// $size  : px or em
// $color : color
// $thickness : px
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

// Example 1.
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

// For screen readers.
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
