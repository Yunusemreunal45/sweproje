import { createRouter, createWebHistory } from "vue-router";
import MoviePage from "../views/MoviePage.vue"; // yeni isim kullanılıyor

const routes = [
  {
    path: "/",
    name: "MoviePage",
    component: MoviePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
