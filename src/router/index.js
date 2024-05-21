import { createRouter, createWebHistory } from "vue-router";
import AlbumsView from "@/views/AlbumsView.vue"
import AlbumView from "@/views/AlbumView.vue"
import NotFoundView from "@/views/404View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "albums", component: AlbumsView },
    { path: "/home", redirect: "/" },
    {
      path: "/album/:id",
      name: "album",
      component: AlbumView,
    },
    {
      path: "/:catchall(.*)*",
      name: "Not Found",
      component: NotFoundView,
    },
  ],
});

export default router;
