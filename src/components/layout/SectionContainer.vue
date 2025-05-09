<script setup lang="ts">
defineProps<{
  // Optional Id, useful for anchor links
  sectionId?: string
}>()
</script>

<template>
  <section :id="sectionId" class="section-container">
    <div v-if="$slots.header" class="section-container__header-wrapper">
      <slot name="header"></slot>
    </div>
    <div class="section-container__content_wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.section-container {
  margin-top: -3.75rem; /* Negative margin to counteract padding */
  margin-bottom: 5rem; /* Space between sections */
  padding-top: 3.75rem; /* Space for anchor link scrolling offset */
}
</style>
