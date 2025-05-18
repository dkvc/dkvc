<script setup lang="ts">
import CardItem from '../card/CardItem.vue'
import packageInfo from '../../../package.json'
</script>

<template>
  <footer class="site-footer">
    <CardItem cardId="footer" fullborder>
      <template #header>
        <div class="site-footer__wrapper">
          <div class="left">© MIT License</div>
          <div class="center">You've reached the end of the page.</div>
          <div class="right">v{{ packageInfo.version }}</div>
        </div>
      </template>
    </CardItem>
  </footer>
</template>

<style scoped>
/* TODO: Fix this! Do not do this! */
.site-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.site-footer :deep(.card-item) {
  margin-bottom: 0;
}

.site-footer :deep(.card-item.full-border-card) {
  border-color: transparent !important;
}

.site-footer :deep(.card-item.full-border-card):hover {
  transform: translateX(0) !important;
}

.site-footer__wrapper {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  gap: 2rem;
  text-align: center;
}
</style>
