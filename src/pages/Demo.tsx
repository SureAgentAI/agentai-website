import { useState, useEffect, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { useTurnstile } from '../hooks/useTurnstile'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const monthlyClaimsOptions = [
  'Less than 1,000',
  '1,000 - 5,000',
  '5,000 - 10,000',
  '10,000 - 50,000',
  'More than 50,000',
  'Not sure',
]

const preferredTimeOptions = [
  'Morning (9AM - 12PM EST)',
  'Afternoon (12PM - 3PM EST)',
  'Late Afternoon (3PM - 6PM EST)',
  'Flexible',
]

function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/agent-ai-demo/agentai-demo"
      style={{ minWidth: '320px', height: '750px', position: 'relative' }}
    >
      <iframe
        src="https://calendly.com/agent-ai-demo/agentai-demo"
        width="100%"
        height="100%"
        frameBorder={0}
        title="Select a Date & Time - Calendly"
      />
    </div>
  )
}

function ScheduleDemoForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { token: turnstileToken, containerRef: turnstileRef, reset: resetTurnstile } = useTurnstile()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot check
    if (formData.get('website_hp')) return

    if (!turnstileToken) {
      setErrorMessage('Please complete the verification')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.get('first_name')} ${formData.get('last_name')}`,
          email: formData.get('email'),
          phone: formData.get('phone') || '',
          company: formData.get('company') || '',
          role: formData.get('role') || '',
          monthly_claims: formData.get('monthly_claims') || '',
          preferred_time: formData.get('preferred_time') || '',
          message: formData.get('message') || '',
          template: 'demo',
          'cf-turnstile-response': turnstileToken,
          _meta: {
            referrer: document.referrer || 'direct',
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        const data = await response.json() as { error?: string }
        throw new Error(data.error || 'Failed to submit')
      }

      setStatus('success')
      form.reset()
      resetTurnstile()
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setErrorMessage('')
    resetTurnstile()
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Demo Request Received!</h3>
        <p className="mt-4 text-gray-600">
          We'll contact you shortly to confirm your demo time.
        </p>
        <button
          onClick={reset}
          className="mt-8 text-primary-600 hover:text-primary-700 font-medium"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <p className="text-sm text-gray-500 mb-4">
            Complete the form below to schedule a personalized demo of our AI-powered billing platform.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                minLength={2}
                maxLength={50}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                minLength={2}
                maxLength={50}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Practice Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Your Role <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="monthly_claims" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Claims Volume <span className="text-red-500">*</span>
              </label>
              <select
                id="monthly_claims"
                name="monthly_claims"
                required
                className={inputClass}
              >
                <option value="">Select volume</option>
                {monthlyClaimsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Demo Time <span className="text-red-500">*</span>
              </label>
              <select
                id="preferred_time"
                name="preferred_time"
                required
                className={inputClass}
              >
                <option value="">Select time</option>
                {preferredTimeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your current billing challenges and what you'd like to see in the demo..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Honeypot */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <input type="text" name="website_hp" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Turnstile */}
        <div ref={turnstileRef} />

        {/* Error Message */}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-primary-500 text-white py-4 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'submitting' ? 'Processing...' : 'Schedule Demo'}
        </button>

        {/* Privacy notice */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 text-center">
          <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure form. By submitting, you agree to our{' '}
          <Link to="/privacy-policy" className="text-primary-600 hover:underline">
            privacy policy
          </Link>
        </p>
      </form>
    </div>
  )
}

export default function Demo() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your <span className="gradient-text">Medical Billing</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join hundreds of practices using AgentAI to automate their billing operations
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Main Content */}
      <div className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 max-w-7xl mx-auto">
            {/* Calendar Section */}
            <div className="lg:order-2">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl text-gray-800 font-medium flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-primary-500" />
                      Book Your Demo
                    </h2>
                    <p className="text-gray-600 mt-2">30-minute personalized demonstration</p>
                  </div>
                  <CalendlyWidget />
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:order-1">
              <ScheduleDemoForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
