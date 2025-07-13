<script setup lang="ts">
import CardItem from '../card/CardItem.vue';

import { expData } from '@/data/exp-data'
import TimelineContainer from '@/components/timeline/TimelineContainer.vue'
import type { ExpItemData } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
    cardId?: string
}>()


/* No need to fetch, data is static */
const expItems = ref<ExpItemData[]>(expData)
</script>

<template>
    <CardItem :card-id="props.cardId" class="exp-card" fullborder>
        <template #content>
            <h2 class="card-title">Professional Experience</h2>
            <TimelineContainer :items="expItems" :exp="true" />
        </template>
    </CardItem>
</template>

<style scoped>
/* Skills Layout */
.exp-card {
    margin-bottom: 3rem;
    border-radius: 8px;
    background-color: hsla(225, 20%, 15%, 0.5);
    padding: 1.5rem;
}

.card-title {
    margin-bottom: 1.5rem;
    color: var(--header-title-and-hover-color);
    font-size: 2em;
    text-align: center;
}
</style>