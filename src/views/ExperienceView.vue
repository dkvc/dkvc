<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import SectionHeader from '@/components/layout/SectionHeader.vue'
import TimelineContainer from '@/components/timeline/TimelineContainer.vue'
import { expData } from '@/data/exp-data'
import type { ExpItemData } from '@/types'
import { ref } from 'vue'

/* No need to fetch, data is static */
const expItems = ref<ExpItemData[]>(expData)
</script>

<template>
    <main class="content-area">
        <SectionContainer sectionId="exps">
            <template #header>
                <SectionHeader text="Professional Experience" :level="1" />
            </template>
            <TimelineContainer :items="expItems" :exp="true" />
        </SectionContainer>
    </main>
</template>

<style scoped>
.content-area {
    position: relative;
    /* Needed for absolute positioning within */
    margin: 2.5rem auto 0;
    padding: 0 1.25rem;
    max-width: 900px;
}
</style>
