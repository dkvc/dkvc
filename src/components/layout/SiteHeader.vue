<script setup lang="ts">
import { ref } from 'vue'

const isNavOpen = ref(false)

function toggleNav() {
  isNavOpen.value = !isNavOpen.value
}

function closeNav() {
  isNavOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="header-content">
      <!-- Header Title -->
      <div class="header-title-container">
        <span class="header-title">Dhanush</span>
        &nbsp;
        <span class="header-title">Kovi</span>
      </div>

      <!-- Nav Menu (Small) -->
      <button
        class="menu-toggle"
        id="menu-toggle"
        aria-label="Toggle navigation"
        :aria-expanded="isNavOpen"
        aria-controls="mainNav"
        @click="toggleNav"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Nav Menu (Large) -->
      <nav class="main-nav" id="mainNav" :class="{ 'nav-open': isNavOpen }">
        <ul>
          <li><RouterLink to="/" @click="closeNav">Home</RouterLink></li>
          <li><RouterLink to="/education" @click="closeNav">Education</RouterLink></li>
          <li><RouterLink to="/projects" @click="closeNav">Projects</RouterLink></li>
          <li><RouterLink to="/contact" @click="closeNav">Contact</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Header */
.site-header {
  position: relative;
  z-index: 10;
  background: transparent;
  padding: 1.5rem 0;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 5%;
  width: 100%;
  max-width: 1200px;
}

.header-title {
  display: inline-block;
  color: var(--header-title-and-hover-color);
  font-weight: 500;
  font-size: 1.625rem;
  /* Use fallback font for non-first letters */
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.header-title::first-letter {
  display: inline-block;
  vertical-align: -0.1em;
  margin-right: 0.125rem;
  font-size: 1.5em;
  line-height: 0.8;
  font-family: 'Fresh Spring', cursive;
}

/* Nav Menu (Large) */
.main-nav ul {
  display: flex;
  gap: 1.5625rem;
}

.main-nav a {
  position: relative;
  transition: color 0.3s ease;
  padding: 0.3125rem 0;
  color: var(--header-text-color);
  font-weight: 400;
  font-size: 1.125rem;
}

/* Underline hover effect */
.main-nav a::after {
  position: absolute;
  bottom: 0;
  left: 20%;

  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
  background-color: var(--header-title-and-hover-color);

  width: 60%;
  height: 0.1em;
  content: '';
}

.main-nav a:hover {
  color: var(--header-title-and-hover-color);
}

.main-nav a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Currently active nav link */
.main-nav a.router-link-exact-active {
  color: var(--header-title-and-hover-color);
}

/* Nav Menu (Small) */
.menu-toggle {
  display: none; /* Hidden on larger screens */
  z-index: 110; /* Above mobile nav */
  cursor: pointer;
  border: none;
  background: none;
  padding: 10px;
}
</style>
