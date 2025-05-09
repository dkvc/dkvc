<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import type { TimelineItemData } from '@/types'

defineProps<{
  items: TimelineItemData[]
}>()
</script>

<template>
  <div class="timeline-container">
    <TimelineItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
  padding: 1.25rem 0;
}

/* Animate Central Vertical Line */
@keyframes moveGradient {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}

.timeline-container::before {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: moveGradient 12s linear infinite;
  border-radius: 0.125rem;
  /* TODO: hsl/hsla */
  background: linear-gradient(
    180deg,
    hsla(213.82, 30.05%, 64.12%, 0.2),
    hsla(213.06, 29.7%, 32.35%, 0.4),
    hsla(225.41, 39.78%, 18.24%, 0.5),
    hsla(213.06, 29.7%, 32.35%, 0.4),
    hsla(213.82, 30.05%, 64.12%, 0.2)
  );
  background-size: 100% 300%; /* taller than height for animation */
  width: 0.25rem;
  height: 100%;
  content: '';
}
</style>
