import { useRef, useEffect, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string
        theme?: 'light' | 'dark' | 'auto'
        size?: 'normal' | 'compact' | 'flexible'
        callback: (token: string) => void
        'expired-callback'?: () => void
      }) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface UseTurnstileOptions {
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact' | 'flexible'
}

export function useTurnstile(options: UseTurnstileOptions = {}) {
  const { theme = 'light', size = 'normal' } = options
  const [token, setToken] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')

  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
    if (!siteKey || !containerRef.current) return

    const renderTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          size,
          callback: (newToken: string) => setToken(newToken),
          'expired-callback': () => setToken(''),
        })
      }
    }

    // Try immediately if already loaded
    if (window.turnstile) {
      renderTurnstile()
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderTurnstile()
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = ''
      }
    }
  }, [theme, size])

  const reset = () => {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current)
      setToken('')
    }
  }

  return { token, containerRef, reset }
}
