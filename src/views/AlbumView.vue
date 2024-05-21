<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStorage } from "@vueuse/core";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ContentContainer from "../components/ContentContainer.vue";
import Header from "../components/Header.vue";

const route = useRoute();
const albumId = route.params.id;
const isLoaded = ref(false);
const photos2D = ref([]);

function create2DArray(list, numRows, numCols) {
  let result = [];
  let index = 0;
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      if (index < list.length) {
        row.push(list[index]);
        index++;
      } else {
        row.push(null); // or any default value you prefer
      }
    }
    result.push(row);
  }
  return result;
}

onMounted(() => {
  axios.get("/api/albums/" + albumId + "/favorites").then((res) => {
    isLoaded.value = true;
    photos2D.value = create2DArray(
      res.data.mediaItems,
      4,
      1 + res.data.mediaItems.length / 10
    );
  });
});

const albums = useStorage("albums", []);
const albumMeta = albums.value.find((album) => album.id === albumId);
</script>

<template>
  <div v-if="isLoaded">
    <Header
      :title="albumMeta.title"
      :subtitle="`Your Favorite Photos`"
    ></Header>
    <ContentContainer>
      <div class="row">
        <div class="column" v-for="col in photos2D">
          <img v-for="photo in col" :src="photo?.baseUrl" />
        </div>
      </div>
    </ContentContainer>
  </div>

  <LoadingSpinner v-else>Loading</LoadingSpinner>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
