<script setup lang="ts">
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { typeColors } from '@/data/timeline-data'
import type { ExpItemData } from '@/types'
import { computed, ref } from 'vue'

const props = defineProps<{
    item: ExpItemData
}>()
const expItemRef = ref<Element | null>(null)
const { isIntersecting } = useIntersectionObserver(expItemRef)

const primaryTypeKey = computed(() => {
    // unlike timelineItem, the color is randomized here
    const colorKeys = Object.keys(typeColors)
    const randomIndx = Math.floor(Math.random() * colorKeys.length)
    return colorKeys[randomIndx]
})

const primaryColor = computed(() => {
    return typeColors[primaryTypeKey.value] || typeColors.default
})

const dotStyle = computed(() => ({
    background: primaryColor.value
}))

const itemClasses = computed(() => ({
    'is-visible': isIntersecting.value,
    [`item-type-${primaryTypeKey.value}`]: true, // For card border styling
}))
</script>

<template>
    <div ref="expItemRef" class="timeline-item" :class="itemClasses">
        <div class="timeline-dot" :style="dotStyle"></div>

        <component :is="'div'" class="timeline-content">
            <div class="timeline-meta-top">
                <div class="location-container">
                    <span class="location-display" :style="{ backgroundColor: primaryColor }">
                        {{ props.item.location }}
                    </span>
                </div>
                <span class="timeline-data">{{ `${item.month_year_start} - ${item.month_year_end}` || 'Date TBD'
                }}</span>
            </div>

            <h3 class="timeline-title">
                {{ item.position || 'Position TBD' }}
            </h3>

            <h4 class="timeline-description">
                {{ props.item.organization || 'No description available' }}
            </h4>
        </component>
    </div>
</template>

<style scoped>
.timeline-item {
    position: relative;
    transform: translateY(2.5rem);
    opacity: 0;
    transition:
        opacity 0.6s ease-out,
        transform 0.6s ease-out;

    margin-bottom: 3.125rem;
    padding: 0.625rem 2.5rem;
    width: 50%;
}

.timeline-item.is-visible {
    transform: translateY(0);
    opacity: 1;
}

/* Alternate timeline items left and right */
.timeline-item:nth-child(odd) {
    left: 0;
    padding-left: 0;
    text-align: right;
}

.timeline-item:nth-child(even) {
    left: 50%;
    padding-right: 0;
    text-align: left;
}

/* Dot Styling */
/* TODO: move hsl/hsla to base.css */
.timeline-dot {
    position: absolute;
    top: 1.563rem;
    z-index: 1;
    /* above central line */
    transition: transform 0.3s ease;
    box-shadow: 0 0 0.5rem hsla(0, 0%, 0%, 0.3);

    /* background-color is set via script */
    border: 0.188rem solid hsl(223.45, 42.03%, 13.53%);
    border-radius: 50%;
    width: 1.125rem;
    height: 1.125rem;
}

/* apply pulse dot animation when item is visible */
/* TODO: move hsl/hsla to base.css */
@keyframes dotPulse {

    0%,
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 hsla(214, 30%, 64%, 0.3);
    }

    50% {
        transform: scale(1.1);
        box-shadow: 0 0 0.375rem 0.625rem hsla(214, 30%, 64%, 0.1);
    }
}

.timeline-item.is-visible .timeline-dot {
    animation: dotPulse 2.8s ease-in-out infinite;
}

/* Position dots on central line.
  Move half the dot width in opposite of item to center on the line */
/* TODO: Fix dot width in base.css */
.timeline-item:nth-child(odd) .timeline-dot {
    right: calc(-1.125rem / 2);
}

.timeline-item:nth-child(even) .timeline-dot {
    left: calc(-1.125rem / 2);
}

/* Content Card */
.timeline-content {
    position: relative;
    transform: translateY(0.625rem);

    /* Initial state for card reveal */
    opacity: 0;
    /* Delayed transitions */
    transition:
        opacity 0.5s ease-out 0.2s,
        clip-path 0.5s ease-out 0.2s,
        transform 0.5s ease-out 0.2s,
        border-color 0.4s ease,
        box-shadow 0.3s ease;

    /* TODO: hsl/hsla */
    box-shadow: 0 0.25rem 0.75rem hsla(0, 0%, 0%, 0.25);
    border-top: 0.25rem solid transparent;
    border-radius: 0.5rem;
    background-color: hsla(225, 40%, 18%, 0.75);
    /* Semi transparent dark */
    padding: 1.25rem 1.563rem;
}

.timeline-title-icon {
    vertical-align: middle;
    font-size: 1em;
    /* color is set via inline style to match primaryColor */
}

/* Initial clip-path for left items (odd) - reveal from right to left */
.timeline-item:nth-child(odd) .timeline-content {
    clip-path: inset(0 0 0 100%);
}

/* Initial clip-path for right items (even) - reveal from left to right */
.timeline-item:nth-child(even) .timeline-content {
    clip-path: inset(0 100% 0 0);
}

/* trigger card reveal when item becomes visible */
.timeline-item.is-visible .timeline-content {
    transform: translateY(0);
    opacity: 1;
    clip-path: inset(0 0% 0 0%);
    /* unclip fully */
}

/* Card top border color */
/* TODO: Cleanup (use one store for colors) */
.timeline-item.item-type-ai .timeline-content,
.timeline-item.item-type-ai .timeline-content:hover {
    border-color: hsl(122.42, 39.44%, 49.22%);
}

.timeline-item.item-type-reinforcement-learning .timeline-content,
.timeline-item.item-type-reinforcement-learning .timeline-content:hover {
    border-color: hsl(222, 90%, 54%);
}

.timeline-item.item-type-web .timeline-content,
.timeline-item.item-type-web .timeline-content:hover {
    border-color: hsl(322.02, 100%, 51.37%);
}

.timeline-item.item-type-deep-learning .timeline-content,
.timeline-item.item-type-deep-learning .timeline-content:hover {
    border-color: hsl(291.24, 63.72%, 42.16%);
}

.timeline-item.item-type-optimization .timeline-content,
.timeline-item.item-type-optimization .timeline-content:hover {
    border-color: hsl(14.39, 100%, 56.67%);
}

.timeline-item.item-type-default .timeline-content,
.timeline-item.item-type-default .timeline-content:hover {
    border-color: hsl(213.82, 30.05%, 64.12%);
}

.timeline-item.item-type-misc .timeline-content,
.timeline-item.item-type-misc .timeline-content:hover {
    border-color: hsl(213.82, 30.05%, 64.12%);
}

.timeline-item.item-type-devops .timeline-content,
.timeline-item.item-type-devops .timeline-content:hover {
    border-color: hsl(4 100% 36.2%);
}

.timeline-item.item-type-tool .timeline-content,
.timeline-item.item-type-tool .timeline-content:hover {
    border-color: hsl(183 100% 36%);
}

.timeline-item.item-type-data-viz .timeline-content,
.timeline-item.item-type-data-viz .timeline-content:hover {
    border-color: hsl(165 100% 35.6%);
}

/* Styling for Elements within Card */
.timeline-meta-top {
    display: flex;
    flex-wrap: wrap;
    /* wrap badges if too many */
    justify-content: space-between;
    align-items: flex-start;
    /* top of card */
    gap: 0.625rem;
    /* space b/w badges and date */
    margin-bottom: 0.938rem;
}

.location-container {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    gap: 0.375rem;
    /* b/w badges */
}

.location-display {
    display: inline-block;

    /* background-color is set by script */
    /* TODO: hsl/hsla */
    box-shadow: 0 0.063rem 0.188rem hsla(0, 0%, 0%, 0.2);
    border-radius: 0.75rem;
    padding: 0.188rem 0.625rem;
    color: hsl(0, 0%, 100%);
    font-weight: 600;
    font-size: 0.75em;
    letter-spacing: 0.031rem;
    text-transform: uppercase;
    white-space: nowrap;
    /* badge text requires no wrapping */
}


.timeline-date {
    margin-top: 0.188rem;
    color: var(--header-title-and-hover-color);
    font-weight: 500;
    font-size: 0.8em;
    white-space: nowrap;
    /* date requires no wrapping */
}

.timeline-title {
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 1.3em;
    line-height: 1.25em;
    /* Color is dynamically adjusted if project.link exists */
}

.timeline-description {
    margin-bottom: 0.938rem;
    /* TODO: hsl/hsla */
    color: hsl(222.35, 15.6%, 78.63%);
    font-weight: 300;
    font-size: 0.95em;
    line-height: 1.6;
}

/* Align tags based on item position */
.timeline-item:nth-child(odd) .timeline-tags {
    justify-content: flex-end;
}

.timeline-item:nth-child(even) .timeline-tags {
    justify-content: flex-start;
}

/* Card Hover Animation */
.timeline-item .timeline-content:hover {
    transform: translateY(-0.25rem);
    border: 0.25rem solid;
    /* TODO: hsl/hsla */
    box-shadow: 0 0.5rem 1.125rem hsla(0, 0%, 0%, 0.3);
}

/* Small screens */
@media (max-width: 768px) {
    .timeline-item {
        left: 0 !important;

        /* Remove all transitions for mobile and set final states */
        transform: translateY(0);
        opacity: 1;
        transition: none;

        margin-bottom: 2.5rem;
        padding-right: 1rem;
        padding-left: 2.5rem;
        width: 100%;
        text-align: left;
    }

    /* Fix odd cards */
    .timeline-item:nth-child(odd) {
        left: 50%;
        padding-right: 0;
        text-align: left;
    }

    .timeline-item:nth-child(odd) {
        padding-right: 1rem !important;
        padding-left: 2.5rem !important;
    }

    .timeline-item:nth-child(even) {
        padding-right: 1rem !important;
        padding-left: 2.5rem !important;
    }

    .timeline-content {
        transform: translateY(0);
        opacity: 1;
        transition:
            transform 0.3s ease-out,
            border-color 0.4s ease,
            box-shadow 0.3s ease;
    }

    /* the card is not clipped initially, remove the clip-path animation */
    .timeline-item:nth-child(odd) .timeline-content,
    .timeline-item:nth-child(even) .timeline-content {
        clip-path: none;
    }

    .timeline-item:nth-child(odd) .timeline-dot,
    .timeline-item:nth-child(even) .timeline-dot {
        right: auto;
        left: 0.5rem;
    }

    .timeline-meta-top {
        justify-content: flex-start;
    }

    .timeline-item:nth-child(odd) .timeline-tags,
    .timeline-item:nth-child(even) .timeline-tags {
        justify-content: flex-start;
    }

    .timeline-title {
        font-size: 1.2em;
    }

    .timeline-description {
        font-size: 0.9em;
        line-height: 1.55;
    }
}
</style>