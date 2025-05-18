<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import { onMounted, onUnmounted, ref } from 'vue'

// Track reduced motion preference
const prefersReducedMotion = ref(false)
let mediaQueryList: MediaQueryList | null = null

const updateReducedMotionPreference = (event?: MediaQueryListEvent) => {
  if (event) {
    prefersReducedMotion.value = event.matches
  } else if (mediaQueryList) {
    prefersReducedMotion.value = mediaQueryList.matches
  }
  console.log('Prefers reduced motion:', prefersReducedMotion.value)
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)')
    updateReducedMotionPreference() // Set initial value
    mediaQueryList.addEventListener('change', updateReducedMotionPreference)
  }
})

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', updateReducedMotionPreference)
  }
})
</script>

<template>
  <AtomBackground v-if="!prefersReducedMotion" />
  <SiteHeader />

  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <SiteFooter />
</template>

<style scoped>
/* Global Transition Styles while changing views */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
