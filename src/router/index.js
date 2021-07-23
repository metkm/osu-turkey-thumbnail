import { createRouter, createWebHistory } from "vue-router"
import Replay from "../views/Replay.vue"
import Knockout from "../views/Knockout.vue"
import Vs from "../views/Vs.vue"

const routes = [
  {
    path: '/',
    name: 'Replay',
    component: Replay
  },
  {
    path: '/knockout',
    name: 'Knockout',
    component: Knockout
  },
  {
    path: '/vs',
    name: 'Vs',
    component: Vs
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
