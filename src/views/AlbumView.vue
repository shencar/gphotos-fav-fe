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

onMounted(() => {
  axios.get("/api/albums/" + albumId + "/favorites").then((res) => {
    isLoaded.value = true;
    photos.value = res.data.mediaItems;
  });
});

</script>

<template>
  <div v-if="isLoaded">
    <HeaderContainer
      :title="albumMeta.title"
      :subtitle="`Your Favorite Photos`"
    ></HeaderContainer>
    <ContentContainer>
      <ul>
        <li v-for="photo in photos">
          <img :src="photo?.baseUrl" />
        </li>
      </ul>
    </ContentContainer>
  </div>

  <LoadingSpinner v-else>Loading</LoadingSpinner>
</template>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 50px;
}

li {
  height: 40vh;
  flex-grow: 1;
  padding: 5px;
}

li:last-child {
  flex-grow: 10;
}

img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: center;
  border-radius: 4%;
  transition: border-color 0.3s; /* Adding transition for smooth effect */
}
img:hover {
  border: 2px solid; /* Adding yellow border on hover */
}

@media (max-aspect-ratio: 1/1) {
  li {
    height: 30vh;
  }
}

@media (max-height: 480px) {
  li {
    height: 80vh;
  }
}

@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  ul {
    flex-direction: row;
  }

  li {
    height: auto;
    width: 100%;
  }
  img {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
}
</style>
