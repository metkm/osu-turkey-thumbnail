import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Replay from "../views/Replay.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Replay,
  },
]


export default createRouter({
  history: createWebHistory(),
  routes
})
