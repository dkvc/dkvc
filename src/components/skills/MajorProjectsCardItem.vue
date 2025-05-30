<script setup lang="ts">
import CardItem from '../card/CardItem.vue'
import { timelineData, typeColors } from '@/data/timeline-data'
import type { TimelineItemData } from '@/types'
import { computed } from 'vue'

defineProps<{
  cardId?: string
}>()

const majorProjects = computed(() => {
  return timelineData.filter((item: TimelineItemData) => item.major === true)
})

const getBadgeColor = (typeStr: string): string => {
  const typeKey = typeStr.toLowerCase().replace(/\s+/g, '-')
  return typeColors[typeKey] || typeColors.default
}
</script>

<template>
  <CardItem :cardId="cardId" class="card" fullborder>
    <template #content>
      <h2 class="section-title">Key Projects</h2>
      <div v-if="majorProjects.length > 0" class="major-projects-list">
        <div
          v-for="project in majorProjects"
          :key="project.id || project.project_name"
          class="project-card-item"
        >
          <component
            :is="project.link ? 'a' : 'div'"
            :href="project.link"
            :target="project.link ? '_blank' : undefined"
            :rel="project.link ? 'noopener noreferrer' : undefined"
            class="project-card-content-wrapper"
          >
            <h5 class="project-card-name" :class="{ 'is-private-title': project.private }">
              <span class="project-name-text">{{ project.project_name }}</span>
              <span
                v-if="project.private"
                class="material-symbols-outlined project-card-lock-icon"
                title="Private project"
                >encrypted</span
              >
            </h5>
            <p v-if="project.description" class="project-card-description">
              {{ project.description }}
            </p>
            <div
              v-if="project.project_type && project.project_type.length > 0"
              class="project-card-types"
            >
              <span
                v-for="typeStr in project.project_type"
                :key="typeStr"
                class="project-card-type-badge"
                :style="{ backgroundColor: getBadgeColor(typeStr) }"
              >
                {{ typeStr }}
              </span>
            </div>
          </component>
        </div>
      </div>
      <p v-else class="no-projects-message">
        Details about major projects will be showcased here soon.
      </p>
    </template>
  </CardItem>
</template>

<style scoped>
.section-title {
  margin-bottom: 1.5rem;
  color: var(--header-title-and-hover-color);
  font-size: 2em;
  text-align: center;
}

.major-projects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1em;
}

.project-card-item {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;
  border: 1px solid
    hsla(var(--card-item-bg-h, 225), var(--card-item-bg-s, 30%), var(--card-item-bg-l, 30%), 0.5);
  border-radius: 6px;
  background-color: hsla(
    var(--card-item-bg-h, 225),
    var(--card-item-bg-s, 30%),
    var(--card-item-bg-l, 22%),
    0.7
  );
  width: 100%;
}

.project-card-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px hsla(0, 0%, 0%, 0.2);
  background-color: hsla(
    var(--card-item-bg-h, 225),
    var(--card-item-bg-s, 30%),
    var(--card-item-bg-l, 25%),
    0.8
  );
}

.project-card-content-wrapper {
  display: block;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  color: inherit;
  text-decoration: none;
}

.project-card-name {
  display: flex;
  justify-content: space-between; /* position lock icon to the right */
  align-items: center;
  margin-bottom: 0.35rem;
  color: var(--header-title-and-hover-color, hsl(0, 0%, 93%));
  font-weight: 600;
  font-size: 1.1em;
}

.project-name-text {
  flex-grow: 1;
  margin-right: 0.5em;
}

/* Default link styling for project name text (public or if private doesn't override) */
a.project-card-content-wrapper .project-card-name .project-name-text {
  color: var(--text-link-color, hsl(217, 89%, 76%));
}
a.project-card-content-wrapper:hover .project-card-name .project-name-text {
  color: var(--text-link-hover-color, hsl(218, 91%, 82%));
  text-decoration: underline;
}

/* Styling for the title of private projects */
.project-card-name.is-private-title .project-name-text {
  color: var(
    --header-title-and-hover-color,
    var(--text-secondary-color, hsl(222.35, 15.6%, 78.63%))
  );
}

.project-card-lock-icon {
  flex-shrink: 0;
  color: var(
    --header-title-and-hover-color,
    var(--text-secondary-color, hsl(222.35, 15.6%, 78.63%))
  );
  font-size: 1em;
}

.project-card-description {
  margin-bottom: 0.75rem;
  color: var(--text-secondary-color, hsl(222.35, 15.6%, 78.63%));
  font-size: 0.85em;
  line-height: 1.5;
}

.project-card-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
}

.project-card-type-badge {
  display: inline-block;
  box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.15);
  border-radius: 0.5rem;
  padding: 0.2em 0.5em;
  color: hsl(0, 0%, 100%);
  font-weight: 600;
  font-size: 0.65em;
  text-transform: uppercase;
  white-space: nowrap;
}

.no-projects-message {
  margin-top: 1em;
  color: var(--text-secondary-color, hsl(222.35, 15.6%, 78.63%));
  font-style: italic;
  text-align: center;
}
</style>
