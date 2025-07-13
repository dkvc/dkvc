<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import ExpItem from './ExpItem.vue'
import type { ExpItemData, TimelineItemData } from '@/types'

withDefaults(defineProps<{
  items: TimelineItemData[] | ExpItemData[] // TODO: bad, fix this
  exp?: boolean
}>(), {
  exp: false
})
</script>

<template>
  <div class="timeline-container">
    <div v-if="!exp">
      <TimelineItem v-for="item in items" :key="item.id" :item="item as TimelineItemData" />
    </div>
    <div v-else>
      <ExpItem v-for="item in items" :key="item.id" :item="item as ExpItemData" />
    </div>
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
  background: linear-gradient(180deg,
      hsla(213.82, 30.05%, 64.12%, 0.2),
      hsla(213.06, 29.7%, 32.35%, 0.4),
      hsla(225.41, 39.78%, 18.24%, 0.5),
      hsla(213.06, 29.7%, 32.35%, 0.4),
      hsla(213.82, 30.05%, 64.12%, 0.2));
  background-size: 100% 300%;
  /* taller than height for animation */
  width: 0.25rem;
  height: 100%;
  content: '';
}

@media (max-width: 768px) {
  .timeline-container::before {
    left: 1rem;
  }
}
</style>
