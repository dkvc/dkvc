<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

/* TODO: Move colors elsewhere */
import { typeColors } from '@/data/timeline-data'

const props = defineProps<{
  cardId?: string
  fullborder?: boolean
}>()

const cardElementRef = ref<HTMLDivElement | null>(null)
const { isIntersecting } = useIntersectionObserver(cardElementRef, {
  threshold: 0.1,
})

const getRandomTypeColor = (): string => {
  // do not use fallback color
  const colorValues = Object.values(typeColors).slice(1)
  if (colorValues.length === 0) {
    return 'transparent'
  }

  const randomIndex = Math.floor(Math.random() * colorValues.length)
  return colorValues[randomIndex]
}

const randomBorderColor = getRandomTypeColor()
const cardStyles = computed(() => {
  const styles: Record<string, string> = {}
  if (props.fullborder) {
    styles.borderColor = randomBorderColor
  } else {
    styles.borderTopColor = randomBorderColor
    styles.borderRightColor = randomBorderColor
  }

  return styles
})

const cardClasses = computed(() => {
  return {
    'card-item': true,
    'is-visible': isIntersecting.value,
    'full-border-card': props.fullborder,
  }
})
</script>

<template>
  <div :id="cardId" :class="cardClasses" ref="cardElementRef" :style="cardStyles">
    <div v-if="$slots.header" class="card-item__header-wrapper">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.content" class="card-item__container_wrapper">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.card-item {
  /* Transition */
  transform: translateY(0.625rem);

  /* Default animation properties (for non-fullBorder cards) */
  transform: translateY(0.625rem);
  opacity: 0;
  opacity: 0;
  z-index: 1;
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;

  margin-bottom: 2em;
  /* TODO: move hsl/hsla to base.css */
  box-shadow: 0 0.25rem 0.75rem hsla(0, 0%, 0%, 0.25);
  border: 0.25rem solid transparent;
  border-radius: 0.5rem;
  background-color: hsla(225, 40%, 18%, 0.75); /* Semi transparent dark */
  padding: 1.25rem 1.563rem;
}

.card-item.is-visible {
  transform: translateY(0);
  opacity: 1;
}

.card-item.full-border-card {
  border: 0.1em solid transparent;
}

.card-item.full-border-card:hover {
  transform: translateY(0);
}

.card-item:hover {
  transform: translateY(-0.625rem);
}
</style>
