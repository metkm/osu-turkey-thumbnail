import { createRouter, createWebHistory } from 'vue-router'
import Replay from '../views/Replay.vue'
import Knockout from "../views/Knockout.vue"

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
