<script setup lang="ts">
import EducationCardItem from '@/components/education/EducationCardItem.vue'
import SectionContainer from '@/components/layout/SectionContainer.vue'
import SectionHeader from '@/components/layout/SectionHeader.vue'
import { educationData } from '@/data/education-data'
</script>

<template>
  <main class="content-area">
    <SectionContainer sectionId="education">
      <template #header>
        <SectionHeader text="Education" :level="1" />
      </template>
      <EducationCardItem v-for="item in educationData" :key="item.id" :card-id="item.id">
        <template #degree>{{ item.degree }}</template>
        <template #institution>{{ item.institution }}</template>
        <template #date>{{ item.date }}</template>
        <template #location>{{ item.location }}</template>
        <template #points>
          <template v-if="item.points">
            <ul v-if="Array.isArray(item.points)" class="points-list">
              <li v-for="(point, index) in item.points" :key="index">{{ point }}</li>
            </ul>
            <p v-else>{{ item.points }}</p>
          </template>
        </template>
      </EducationCardItem>
    </SectionContainer>
  </main>
</template>

<style scoped>
.content-area {
  position: relative; /* Needed for absolute positioning within */
  margin: 2.5rem auto 0;
  padding: 0 1.25rem;
  max-width: 800px;
}

.points-list {
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.points-list li {
  margin-bottom: 0.5rem;
}
</style>
