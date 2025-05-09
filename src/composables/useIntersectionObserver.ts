import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

interface ObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

export function useIntersectionObserver(
  target: Ref<Element | null>,
  options: ObserverOptions = { threshold: 0.1 },
) {
  const isIntersecting = ref(false)
  let observer: IntersectionObserver | null = null

  const observerCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        isIntersecting.value = true

        // unobserve after first intersection
        if (observer && entry.target) {
          observer.unobserve(entry.target)
        }
      } else {
        isIntersecting.value = false
      }
    })
  }

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(observerCallback, options)
    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { isIntersecting }
}
