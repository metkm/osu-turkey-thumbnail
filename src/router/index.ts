import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Replay from "../views/Replay.vue";
import Settings from "../views/Settings.vue";
import Showcase from "../views/Showcase.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Replay,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/showcase",
    component: Showcase,
  },
]


export default createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'link-active'
})
