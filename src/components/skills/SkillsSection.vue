<script setup lang="ts">
import { ref, computed } from 'vue'
import { skillsData } from '@/data/skills-data'
import { timelineData, typeColors } from '@/data/timeline-data'
import type { TimelineItemData } from '@/types'
import CardItem from '../card/CardItem.vue'

const hoveredSkill = ref<string | null>(null)
const clickedSkill = ref<string | null>(null)
const isMouseOverSkillItem = ref(false)

/* Flip panel check */
const isPanelFlipped = computed(() => {
  if (clickedSkill.value) return true
  return isMouseOverSkillItem.value && !!hoveredSkill.value
})

/* Active Skill */
const activeSkillForProjects = computed(() => {
  if (clickedSkill.value) return clickedSkill.value
  if (isMouseOverSkillItem.value && hoveredSkill.value) return hoveredSkill.value
  return null
})

const projectsForActiveSkill = computed(() => {
  if (!activeSkillForProjects.value) return []
  const skillToMatch = activeSkillForProjects.value.toLowerCase()
  return timelineData.filter((project: TimelineItemData) => {
    const projectSkills = [
      ...(project.tags?.map((tag) => tag.toLowerCase()) || []),
      ...(project.project_type?.map((pt) => pt.toLowerCase()) || []),
      ...(project.additional_tags?.map((tag) => tag.toLowerCase()) || []),
    ]
    return projectSkills.includes(skillToMatch)
  })
})

const expandedDescriptionId = ref<string | null | undefined>(null)

/* Mouse events */
function handleProjectCardMouseEnter(projectId: string | undefined) {
  if (projectId) expandedDescriptionId.value = projectId
}
function handleProjectCardMouseLeave() {
  expandedDescriptionId.value = null
}

function handleSkillMouseEnter(skill: string) {
  isMouseOverSkillItem.value = true
  hoveredSkill.value = skill
}
function handleSkillMouseLeave() {
  isMouseOverSkillItem.value = false

  // Only clear hoveredSkill if it's not the one currently locked by a click,
  // or if nothing is clicked at all.
  if (!clickedSkill.value || (clickedSkill.value && hoveredSkill.value !== clickedSkill.value)) {
    hoveredSkill.value = null
  }
}

function handleSkillClick(skill: string) {
  if (clickedSkill.value === skill) {
    const previouslyClickedSkill = clickedSkill.value
    clickedSkill.value = null

    // TODO: It appears to be broken here? Need to check later.

    // If the skill just un-clicked was also the hovered skill,
    // and the mouse isn't actively registered as over an item
    // then clear hover to ensure panel closes and skill resets to default.
    // This handles the edge case where mouseleave might not fire quickly enough
    // relative to the click processing.
    if (hoveredSkill.value === previouslyClickedSkill && !isMouseOverSkillItem.value) {
      hoveredSkill.value = null
    }
  } else {
    clickedSkill.value = skill
    hoveredSkill.value = skill
    isMouseOverSkillItem.value = true
  }
}

const getBadgeColor = (typeStr: string): string => {
  const typeKey = typeStr.toLowerCase().replace(/\s+/g, '-')
  return typeColors[typeKey] || typeColors.default
}
</script>

<template>
  <CardItem class="skills-section-container" fullborder>
    <template #content>
      <h2 class="section-title">Worked with</h2>
      <div class="skills-layout">
        <div class="skills-list-panel">
          <div v-for="category in skillsData" :key="category.name" class="skill-category">
            <h3 class="category-name">{{ category.name }}</h3>
            <ul class="skills-list">
              <li
                v-for="skill in category.skills"
                :key="skill"
                class="skill-item"
                @mouseenter="handleSkillMouseEnter(skill)"
                @mouseleave="handleSkillMouseLeave"
                @click="handleSkillClick(skill)"
                :class="{ 'is-clicked-skill': clickedSkill === skill }"
                tabindex="0"
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>

        <div class="details-panel-wrapper">
          <div class="details-panel" :class="{ 'is-flipped': isPanelFlipped }">
            <div class="panel-face panel-front" v-show="!isPanelFlipped">
              <h3 class="details-title">Skills Overview</h3>
              <p class="details-instruction">Hover or click on a skill to see related projects.</p>
            </div>
            <div class="panel-face panel-back" v-show="isPanelFlipped">
              <div v-if="activeSkillForProjects" class="projects-showcase">
                <h4 class="projects-title">Projects using {{ activeSkillForProjects }}</h4>
                <ul v-if="projectsForActiveSkill.length > 0" class="project-list-cards">
                  <li
                    v-for="project in projectsForActiveSkill"
                    :key="project.id || project.project_name"
                    class="project-card-item"
                    @mouseenter="handleProjectCardMouseEnter(project.id || project.project_name)"
                    @mouseleave="handleProjectCardMouseLeave()"
                  >
                    <component
                      :is="project.link ? 'a' : 'div'"
                      :href="project.link"
                      :target="project.link ? '_blank' : undefined"
                      :rel="project.link ? 'noopener noreferrer' : undefined"
                      class="project-card-content-wrapper"
                    >
                      <h5 class="project-card-name">
                        {{ project.project_name }}
                        <span
                          v-if="project.private"
                          class="fa fa-lock project-card-lock-icon"
                          title="Private project"
                        ></span>
                      </h5>
                      <p
                        v-if="project.description"
                        class="project-card-description"
                        :class="{
                          'is-expanded':
                            expandedDescriptionId === (project.id || project.project_name),
                        }"
                      >
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
                  </li>
                </ul>
                <p v-else class="no-projects-found">
                  No specific <span class="focused-public">public</span> projects to show for
                  {{ activeSkillForProjects }} currently.
                </p>
              </div>
              <div v-else class="projects-showcase-empty"><p>Select a skill.</p></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CardItem>
</template>

<style scoped>
/* Skills Layout */
.skills-section-container {
  margin-bottom: 3rem;
  border-radius: 8px;
  background-color: hsla(225, 20%, 15%, 0.5);
  padding: 1.5rem;
}
.section-title {
  margin-bottom: 1.5rem;
  color: var(--header-title-and-hover-color);
  font-size: 2em;
  text-align: center;
}
.skills-layout {
  display: flex;
  gap: 1.5rem;
}
.skills-list-panel {
  flex: 1 1 45%;
  padding-right: 1rem;
}
.skills-list-panel::-webkit-scrollbar {
  width: 8px;
}
.skills-list-panel::-webkit-scrollbar-track {
  border-radius: 4px;
  background: var(--card-bg-color);
}
.skills-list-panel::-webkit-scrollbar-thumb {
  border: 2px solid var(--card-bg-color);
  border-radius: 4px;
  background-color: var(--accent-color);
}
.skill-category {
  margin-bottom: 1.5rem;
}
.category-name {
  margin-bottom: 0.75rem;
  border-bottom: 1px solid
    hsla(var(--primary-color-h, 210), var(--primary-color-s, 80%), var(--primary-color-l, 60%), 0.3);
  padding-bottom: 0.25rem;
  color: var(--primary-color, hsl(210, 100%, 71%));
  font-size: 1.2em;
}
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 0;
  list-style: none;
}

/* Skill Item Styles */
/* TODO: Need to move hsl or hex colors in this file */
.skill-item {
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.1s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 15px;
  background-color: hsla(
    var(--card-item-bg-h, 225),
    var(--card-item-bg-s, 40%),
    var(--card-item-bg-l, 25%),
    0.7
  );
  padding: 0.4em 0.8em;
  color: var(--text-secondary-color, hsl(0, 0%, 75%));
  font-size: 0.9em;
}

.skill-item:not(.is-clicked-skill):hover,
.skill-item:not(.is-clicked-skill):focus {
  transform: translateY(-2px);
  outline: none;
  box-shadow: 0 0 8px
    hsla(var(--primary-color-h, 210), var(--primary-color-s, 80%), var(--primary-color-l, 60%), 0.4);
  border-color: hsla(
    var(--primary-color-h, 210),
    var(--primary-color-s, 80%),
    var(--primary-color-l, 50%),
    0.7
  );
  background-color: var(--primary-color, hsl(210, 100%, 71%)); /* blueish for hover */
  color: hsl(var(--primary-color-h, 210), 15%, 95%);
}

.skill-item.is-clicked-skill {
  transform: translateY(-2px);
  outline: none;
  box-shadow: 0 0 10px
    hsla(var(--accent-color-h, 14), var(--accent-color-s, 100%), var(--accent-color-l, 50%), 0.7) !important;
  /* use !important to ensure these styles override other hover styles if there's a specificity clash */
  border-color: hsla(
    var(--accent-color-h, 14),
    var(--accent-color-s, 100%),
    var(--accent-color-l, 50%),
    0.9
  ) !important;
  background-color: var(--accent-color, hsl(14.39, 100%, 56.67%)) !important;
  color: white !important;
}

/* Details Panel Styles */
.details-panel-wrapper {
  flex: 1 1 50%;
  perspective: 1000px;
  min-height: 350px;
}
.details-panel {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 0.9);
  box-shadow: 0 4px 15px hsla(0, 0%, 0%, 0.2);
  border: 2px solid var(--accent-color, hsl(14.39, 100%, 56.67%));
  border-radius: 8px;
  background-color: hsla(225, 40%, 18%, 0.85);
  width: 100%;
  height: 100%;
  min-height: 350px;
}
.details-panel.is-flipped {
  transform: rotateY(180deg);
}
.panel-face {
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
}
.panel-front {
  overflow-y: auto;
  color: var(--text-color);
}
.details-title {
  margin-bottom: 0.5em;
  color: var(--header-title-and-hover-color);
  font-size: 1.8em;
}
.details-instruction {
  color: var(--text-secondary-color);
  font-size: 1em;
}
.panel-back {
  justify-content: flex-start;
  align-items: stretch;
  transform: rotateY(180deg);
  overflow-y: auto;
  color: var(--text-color);
  text-align: left;
}

/* Project Card Styles */
.projects-showcase {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.projects-showcase-empty {
  align-self: center;
  margin-top: 2rem;
  color: var(--text-secondary-color);
}
.projects-title {
  flex-shrink: 0;
  margin-bottom: 1rem;
  color: var(--accent-color, hsl(14.39, 100%, 56.67%));
  font-size: 1.3em;
  text-align: center;
}
.project-list-cards {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0 0.25rem 0.5rem 0.25rem;
  overflow-y: auto;
  list-style: none;
}
.project-card-item {
  flex-shrink: 0;
  transition: background-color 0.2s ease;
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
  align-items: center;
  margin-bottom: 0.25rem;
  color: var(--header-title-and-hover-color, hsl(0, 0%, 88%));
  font-weight: 600;
  font-size: 1em;
}
a .project-card-name {
  color: var(--text-link-color, hsl(217, 89%, 76%));
}
a:hover .project-card-name {
  color: var(--text-link-hover-color, hsl(218, 91%, 82%));
  text-decoration: underline;
}
.project-card-lock-icon {
  margin-left: 0.4em;
  color: var(--text-secondary-color, hsl(222.35, 15.6%, 78.63%));
  font-size: 0.8em;
}
.project-card-description {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary-color, hsl(222.35, 15.6%, 78.63%));
  font-size: 0.85em;
  line-height: 1.5;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
  transition: max-height 0.35s ease-in-out;
  max-height: 2.55em;
  overflow: hidden;
}
.project-card-description.is-expanded {
  line-clamp: unset;
  max-height: 15em;
  overflow: visible;
}
.project-card-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 1rem;
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
.no-projects-found {
  margin-top: 1rem;
  padding: 1rem;
  color: var(--text-secondary-color);
  font-style: italic;
  text-align: center;
}

.focused-public {
  color: hsl(14.39, 100%, 56.67%);
}

/* Smaller Screens */
@media (max-width: 900px) {
  .skills-layout {
    flex-direction: column;
  }
  .skills-list-panel {
    flex-basis: auto;
    margin-bottom: 1.5rem;
    padding-right: 0;
    max-height: none;
  }
  .details-panel-wrapper {
    flex-basis: auto;
    min-height: 300px;
  }
}
@media (max-width: 768px) {
  .details-panel-wrapper {
    display: none;
  }
  .skills-list-panel {
    margin-bottom: 0;
  }
  .section-title {
    font-size: 1.8em;
  }
  .category-name {
    font-size: 1.1em;
  }
  .skill-item {
    font-size: 0.85em;
  }
}
</style>
