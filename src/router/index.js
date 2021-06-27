import { createRouter, createWebHistory } from 'vue-router'
import Replay from '../views/Replay.vue'

const routes = [
  {
    path: '/',
    name: 'Replay',
    component: Replay
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
