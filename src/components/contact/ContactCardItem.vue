<script setup lang="ts">
import CardItem from '../card/CardItem.vue'
import { contacts } from '@/data/contact-data'

defineProps<{
  cardId?: string
}>()
</script>

<template>
  <CardItem :cardId="cardId" class="card" fullborder>
    <template #header> You can also find me on: </template>
    <template #content>
      <ul class="contact-list">
        <li v-for="contact in contacts" :key="contact.id" class="contact-list-item">
          <a :href="contact.link" target="_blank" rel="noopener noreferrer" class="contact-link">
            <!-- Material Symbols -->
            <span
              v-if="contact.iconType === 'material'"
              class="material-symbols-outlined contact-icon-item"
              aria-hidden="true"
            >
              {{ contact.iconContent }}
            </span>

            <!-- SVG Brand Icons (from https://simpleicons.org) -->
            <img
              v-else-if="contact.iconType === 'svg'"
              :src="contact.iconContent"
              :alt="contact.name + ' icon'"
              class="contact-icon-item contact-brand-icon"
              aria-hidden="true"
            />
            <span class="contact-name">{{ contact.name }}</span>
          </a>
        </li>
      </ul>
    </template>
  </CardItem>
</template>

<style scoped>
.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1em;
}

.contact-name {
  font-weight: 500;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between icon and text */
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  box-shadow: 0 0.25rem 0.75rem hsla(0, 0%, 0%, 0.25);
  border: 0.1rem solid transparent;
  border-color: hsl(14.39, 100%, 56.67%);
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  color: var(--text-color);
  text-decoration: none;
}

.contact-link:hover,
.contact-link:focus {
  background-color: hsl(14.39, 100%, 56.67%);
}

.contact-link i {
  width: 1.5em; /* To align text even if some items don't have icons */
  font-size: 1.2em;
  text-align: center;
}

.contact-icon-item {
  font-size: 1em;
}

.contact-brand-icon {
  display: block;
  width: 1em;
  height: 1em;
}
</style>
