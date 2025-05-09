<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import SectionHeader from '@/components/layout/SectionHeader.vue'
import TimelineContainer from '@/components/timeline/TimelineContainer.vue'
import { timelineData } from '@/data/timeline-data'
import type { TimelineItemData } from '@/types'
import { ref } from 'vue'

/* No need to fetch, data is static */
const projectItems = ref<TimelineItemData[]>(timelineData)
</script>

<template>
  <main class="content-area">
    <SectionContainer sectionId="projects">
      <template #header>
        <SectionHeader text="Project History" :level="1" />
      </template>
      <TimelineContainer :items="projectItems" />
    </SectionContainer>
  </main>
</template>

<style scoped>
.content-area {
  position: relative; /* Needed for absolute positioning within */
  margin: 2.5rem auto 0;
  padding: 0 1.25rem;
  max-width: 900px;
}
</style>
