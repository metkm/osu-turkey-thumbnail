import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Replay from "../views/Replay.vue";
import Settings from "../views/Settings.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Replay,
  },
  {
    path: "/settings",
    component: Settings,
  },
]


export default createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'link-active'
})
