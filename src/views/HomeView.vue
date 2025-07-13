<script setup lang="ts">
import AboutCardItem from '@/components/contact/AboutCardItem.vue'
import ContactCardItem from '@/components/contact/ContactCardItem.vue'
import SectionContainer from '@/components/layout/SectionContainer.vue'
import SkillsSection from '@/components/skills/SkillsSection.vue'
import MajorProjectsCardItem from '@/components/skills/MajorProjectsCardItem.vue'

import { profile } from '@/data/about-data'
import ExpCardItem from '@/components/timeline/ExpCardItem.vue'
</script>

<template>
  <div>
    <main class="content-area">
      <SectionContainer sectionId="contact">
        <AboutCardItem cardId="about" v-bind="profile" />
        <ContactCardItem cardId="contact" />
        <ExpCardItem cardId="exp" />
        <SkillsSection />
        <MajorProjectsCardItem cardId="major-projects" />
      </SectionContainer>
    </main>
  </div>
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
