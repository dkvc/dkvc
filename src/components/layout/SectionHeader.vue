<script setup lang="ts">
const props = defineProps<{
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}>()

const headingTag = `h${props.level}` as const
</script>

<template>
  <component :is="headingTag" class="section-header-title">
    {{ text }}
  </component>
</template>

<style scoped>
.section-header-title {
  margin-bottom: 3.125rem;
  font-weight: 500;
  font-size: 2.5em;
  text-align: center;
}
</style>
