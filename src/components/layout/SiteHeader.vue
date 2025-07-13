<script setup lang="ts">
import { ref } from 'vue'

const isNavOpen = ref(false)
const menuToggleRef = ref<HTMLButtonElement | null>(null)

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
      <button ref="menuToggleRef" class="menu-toggle" :class="{ 'is-active': isNavOpen }" aria-label="Toggle navigation"
        :aria-expanded="isNavOpen" aria-controls="mainNav" @click="toggleNav">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <!-- Nav Menu (Large) -->
      <nav class="main-nav" id="mainNav" :class="{ 'nav-open': isNavOpen }">
        <ul>
          <li>
            <RouterLink to="/" @click="closeNav">Home</RouterLink>
          </li>
          <li>
            <RouterLink to='/exp' @click="closeNav">Experience</RouterLink>
          </li>
          <li>
            <RouterLink to="/projects" @click="closeNav">Projects</RouterLink>
          </li>
          <li>
            <RouterLink to="/education" @click="closeNav">Education</RouterLink>
          </li>
          <li>
            <a href="/Dhanush_Kovi_CV.pdf" target="_blank" rel="noopener noreferrer" class="external-link">
              CV
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="external-link-icon" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span class="sr-only">(opens in new window)</span>
            </a>
          </li>
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
  font-family: 'Brittany Charming', cursive;
}

/* Nav Menu (Large) */
.main-nav ul {
  display: flex;
  align-items: center;
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

.sr-only {
  display: none;
}

/* Nav Menu (Small) */
.menu-toggle {
  display: none;
  /* Hidden on larger screens */
  position: relative;
  z-index: 110;
  /* Above mobile nav */

  transition-duration: 0.15s;
  transition-property: opacity, filter;
  transition-timing-function: linear;

  cursor: pointer;
  border: none;
  background: none;
  padding: 15px;
  overflow: visible;
}

.hamburger-box {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 24px;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
  /* Half of its height */
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  position: absolute;
  transition-duration: 0.15s;
  transition-property: transform;
  transition-timing-function: ease;
  border-radius: 4px;
  background-color: var(--header-text-color);
  width: 30px;
  height: 3px;
}

.hamburger-inner::before,
.hamburger-inner::after {
  display: block;
  content: '';
}

.hamburger-inner::before {
  top: -10px;
  /* Spacing from middle line */
}

.hamburger-inner::after {
  bottom: -10px;
  /* Spacing from middle line */
}

/* Hamburger Animation to X */
.menu-toggle.is-active .hamburger-inner {
  transform: rotate(45deg);
  transition-delay: 0.12s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: var(--header-text-color);
  /* Ensure color consistency */
}

.menu-toggle.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(-90deg);
  transition:
    top 0.1s ease-out,
    transform 0.12s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  background-color: var(--header-text-color);
}

.menu-toggle.is-active .hamburger-inner::after {
  bottom: 0;
  transform: rotate(-90deg);
  opacity: 0;
  transition: opacity 0.1s ease-out;
}

/* Simpler X by rotating top/bottom and hiding middle */
.menu-toggle.is-active .hamburger-inner {
  background-color: transparent;
}

.menu-toggle.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(45deg);
  transition:
    top 0.1s ease-out,
    transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s;
}

.menu-toggle.is-active .hamburger-inner::after {
  bottom: 0;
  transform: rotate(-45deg);
  transition:
    bottom 0.1s ease-out,
    transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s;
}

/* Small screens */
@media (max-width: 768px) {
  .menu-toggle {
    display: inline-block;
  }

  .main-nav {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-100%);
    /* we can also do translateX(100%) to slide from right */
    visibility: hidden;

    opacity: 0;
    z-index: 1000;
    /* Below toggle */
    backdrop-filter: blur(50px);
    transition:
      opacity 0.5s ease,
      visibility 0.5s ease,
      transform 0.5s ease-in-out;
    margin-bottom: 1em;
    /* TODO: move hsl/hsla to base.css */
    box-shadow: 0 0.25rem 0.75rem hsla(0, 0%, 0%, 0.25);
    border-bottom-right-radius: 5%;
    border-bottom-left-radius: 5%;
    background-color: var(--mobile-nav-background);
    padding-top: 2em;
    width: 100%;
    height: 50%;
  }

  .main-nav.nav-open {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
  }

  .main-nav ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    text-align: center;
  }

  .main-nav ul li {
    width: 85%;
    max-width: 320px;
  }

  .main-nav ul li a {
    display: block;
    /* make whole area tappable */
    transition:
      background-color 0.2s ease-out,
      color 0.2s ease-out,
      border-color 0.2s ease-out;
    font-weight: 500;
    font-size: 1.15rem;
    line-height: 1.5;
    text-decoration: none;
  }

  /* remove underline effect for mobile nav items */
  .main-nav ul li a::after {
    display: none;
  }

  .main-nav ul li a {
    display: block;
    transition:
      background-color 0.2s ease-out,
      color 0.2s ease-out,
      border-color 0.2s ease-out;
    border: 2px solid transparent;
    border-radius: 30px;
    /* pill shape */
    padding: 0.7em 1.5em;
    /* pill shape  */
    color: var(--mobile-nav-text-color);
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.5;
    text-decoration: none;
  }

  .main-nav ul li a:hover,
  .main-nav ul li a:active {
    border-color: var(--header-title-and-hover-color);
    color: var(--header-title-and-hover-color);
  }

  .main-nav ul li a.router-link-exact-active {
    border-color: var(--header-title-and-hover-color);
    background-color: hsl(224, 38%, 19%);
    font-weight: 600;
  }
}
</style>
