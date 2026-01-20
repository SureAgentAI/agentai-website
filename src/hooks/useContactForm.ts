import { useState, useCallback, useRef, useEffect } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

interface UseContactFormOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

export function useContactForm(options: UseContactFormOptions = {}) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  // Initialize Turnstile
  useEffect(() => {
    if (!turnstileRef.current || !TURNSTILE_SITE_KEY) return
    if (widgetIdRef.current) return // Already initialized

    const initTurnstile = () => {
      if (window.turnstile && turnstileRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
        })
      }
    }

    // Turnstile might not be loaded yet
    if (window.turnstile) {
      initTurnstile()
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          initTurnstile()
        }
      }, 100)
      return () => clearInterval(interval)
    }

    return () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setStatus('idle')
    setError(null)
    if (widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current)
    }
    setTurnstileToken(null)
  }, [])

  const submitForm = useCallback(async () => {
    if (!turnstileToken) {
      setError('Please complete the verification')
      return
    }

    setStatus('loading')
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'cf-turnstile-response': turnstileToken,
        }),
      })

      if (!response.ok) {
        const data = await response.json() as { error?: string }
        throw new Error(data.error || 'Failed to submit')
      }

      setStatus('success')
      options.onSuccess?.()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setStatus('error')
      setError(message)
      options.onError?.(message)
    }
  }, [formData, turnstileToken, options])

  return {
    formData,
    updateField,
    submitForm,
    resetForm,
    status,
    error,
    turnstileRef,
    isValid: !!(formData.name && formData.email && formData.message && turnstileToken),
  }
}

// Type augmentation for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string
      remove: (widgetId: string) => void
      reset: (widgetId?: string) => void
    }
  }
}
