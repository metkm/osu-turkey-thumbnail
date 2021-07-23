import { createRouter, createWebHistory } from "vue-router"
import Replay from "../views/Replay.vue"

const routes = [
  {
    path: '/',
    name: 'Replay',
    component: Replay
  },
  {
    path: '/knockout',
    name: 'Knockout',
    component: () => import("../views/Knockout.vue")
  },
  {
    path: '/vs',
    name: 'Vs',
    component: () => import("../views/Vs.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
