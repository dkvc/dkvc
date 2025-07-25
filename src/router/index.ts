import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/exp',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/education',
      name: 'education',
      component: () => import('../views/EducationView.vue'),
    },
  ],
})

export default router
