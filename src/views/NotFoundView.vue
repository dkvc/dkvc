<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import SectionHeader from '@/components/layout/SectionHeader.vue'
</script>

<template>
  <main class="content-area">
    <SectionContainer sectionId="not-found">
      <template #header>
        <SectionHeader text="404 | Page Not Found" :level="1" />
      </template>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        You can return to the <router-link to="/" class="link">home page</router-link> or check out
        the <router-link to="/projects" class="link">project history</router-link>.
      </p>
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

p {
  margin: 1rem 0;
  text-align: center;
}

.link {
  color: var(--text-color);
  text-decoration: underline;
}

.link:hover {
  color: var(--header-title-and-hover-color);
}
</style>
