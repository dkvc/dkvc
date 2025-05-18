<script setup lang="ts">
import CardItem from '../card/CardItem.vue'

const props = defineProps<{
  cardId?: string
  firstName?: string
  lastName?: string
  title?: string
  bio?: string
  imageUrl?: string
}>()
</script>

<template>
  <CardItem :cardId="cardId" class="about-card" fullborder>
    <template #content>
      <div class="about-card-content">
        <div class="photo-container">
          <img :src="props.imageUrl" alt="Profile Photo" class="profile-photo" />
        </div>
        <div class="description-container">
          <h2 class="name">
            <span class="first-name">{{ props.firstName }}</span>
            <span class="last-name">{{ props.lastName }}</span>
          </h2>
          <h3 class="title">{{ props.title }}</h3>
          <p class="bio" v-html="props.bio"></p>
        </div>
      </div>
    </template>
  </CardItem>
</template>

<style scoped>
.about-card-content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem 1rem;
  text-align: left;
}

.photo-container {
  flex-shrink: 0;
}

.profile-photo {
  /* TODO: hsl to base.css */
  border: 3px solid hsl(0, 0%, 29%);
  border-radius: 50%;
  background-color: hsl(0, 0%, 17%);
  width: 7.5rem;
  height: 7.5rem;
  object-fit: cover; /* no distortion */
}

.description-container {
  flex-grow: 1;
  text-align: left;
}

.name {
  margin-top: 0;
  margin-bottom: 0.25rem;
  color: hsl(218, 91%, 82%);
  font-size: 1.75rem;
}

.first-name {
  margin-right: 0.5rem;
}

.first-name,
.last-name {
  display: inline-block;
}

.first-name::first-letter,
.last-name::first-letter {
  vertical-align: -0.1em;
  font-size: 1.5em;
  font-family: 'Fresh Spring', cursive;
}

.title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-style: italic;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.4;
}

.bio {
  margin-right: 0;
  margin-left: 0;
  max-width: 80ch;
  line-height: 1.8;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  text-align: left;
}

.bio :deep(.bio-highlight) {
  color: hsl(218, 91%, 82%);
  font-family: 'Melon Camp';
}

/* Mobile */
@media (max-width: 768px) {
  .about-card-content {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0.75rem;
  }

  .profile-photo {
    width: 6rem;
    height: 6rem;
  }

  .name {
    margin-bottom: 0.25rem;
    font-size: 1.5rem;
  }

  .title {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .bio {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
</style>
