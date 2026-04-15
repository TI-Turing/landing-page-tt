import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>{}[]'

export function useTextScramble(finalText: string, trigger: boolean, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const iterationRef = useRef(0)

  useEffect(() => {
    if (!trigger) {
      setDisplayed('')
      return
    }

    iterationRef.current = 0
    let frame: ReturnType<typeof setInterval>

    frame = setInterval(() => {
      setDisplayed(
        finalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterationRef.current) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iterationRef.current += 1 / 2

      if (iterationRef.current >= finalText.length) {
        clearInterval(frame)
        setDisplayed(finalText)
      }
    }, speed)

    return () => clearInterval(frame)
  }, [finalText, trigger, speed])

  return displayed
}

export function useSplitTextReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
