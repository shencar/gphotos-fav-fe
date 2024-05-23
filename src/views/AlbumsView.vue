<script setup>
import PhotoCube from "../components/PhotoCube.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStorage } from "@vueuse/core";
import HeaderContainer from "../components/HeaderContainer.vue";
import ContentContainer from "../components/ContentContainer.vue";

const searchInput = ref("");
const albumCount = ref(0);
const albums = ref([]);

const isLoaded = ref(false);

const visibleAlbums = computed(() => {
  return albums.value.filter((album) =>
    album.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

onMounted(() => {
  axios.get("/api/albums").then((res) => {
    albumCount.value = res.data.total;
    albums.value = res.data.albums;
    const storage = useStorage("albums", res.data.albums);
    isLoaded.value = true;
  });
});
</script>
<template>
  <div v-if="isLoaded">
    <HeaderContainer
      v-if="isLoaded"
      title="Your Albums"
      :subtitle="`You have ${albumCount} Albums`"
    >
      <input type="text" placeholder="Search..." v-model.trim="searchInput" />
    </HeaderContainer>
    <ContentContainer v-if="isLoaded">
      <PhotoCube
        v-for="album in visibleAlbums"
        :key="album.id"
        :imgSrc="album.coverPhotoBaseUrl"
        :title="album.title"
        :subtitle="`${album.mediaItemsCount} Items`"
        @click="() => $router.push(`/album/${album.id}`)"
      ></PhotoCube
    ></ContentContainer>
  </div>
  <LoadingSpinner v-else>Loading</LoadingSpinner>
</template>

<style scoped>
input {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
