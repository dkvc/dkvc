<script setup lang="ts">
import CardItem from '../card/CardItem.vue'

defineProps<{
  cardId?: string
}>()
</script>

<template>
  <CardItem :cardId="cardId" class="card">
    <template #header>
      <div class="card-header">
        <div class="card-degree-info">
          <slot name="degree"></slot>
        </div>
        <div class="card-date">
          <slot name="date"></slot>
        </div>
      </div>
    </template>
    <template #content>
      <div class="card-content">
        <div class="card-main-content">
          <div class="card-institution">
            <slot name="institution"></slot>
          </div>
          <div class="card-location">
            <slot name="location"></slot>
          </div>
        </div>

        <div class="mini-card" v-if="$slots.points">
          <CardItem fullborder>
            <template #content>
              <slot name="points"></slot>
            </template>
          </CardItem>
        </div>
      </div>
    </template>
  </CardItem>
</template>

<style scoped>
.card > div {
  margin: 1em 0;
  line-height: 1.5em;
}

.card-header > div,
.card-main-content > div {
  margin: 0.5em 0;
}

.card-degree-info {
  font-weight: 500;
  font-size: 1.3em;
}

.card-content {
  color: hsl(222.35, 15.6%, 78.63%);
  font-weight: 300;
  font-size: 0.95em;
}

.card-main-content {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.mini-card {
  padding-top: 1em;
}
</style>
