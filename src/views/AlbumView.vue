<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStorage } from "@vueuse/core";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ContentContainer from "../components/ContentContainer.vue";
import HeaderContainer from "../components/HeaderContainer.vue";
import ModalPhoto from "../components/ModalPhoto.vue";

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
    console.log("photos", photos.value);
  });
});

function openModal(photo) {
  modalPhoto.value = photo;
  showModal.value = true;
  document.addEventListener("keydown", closeModalEsc);
}
function closeModal() {
  modalPhoto.value = null;
  showModal.value = false;
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalEsc(event) {
  // Close modal if Esc key is pressed
  if (event.key === "Escape") {
    closeModal();
  }
}
</script>

<template>
  <div v-if="isLoaded">
    <HeaderContainer
      :title="albumMeta.title"
      :subtitle="`Your Favorite Photos`"
    ></HeaderContainer>
    <ContentContainer>
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <ModalPhoto @close="closeModal" :photo="modalPhoto" @keydown.esc="closeModalEsc"/>
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
  /* z-index: 9999; /* Ensure the modal is on top */
}
</style>
