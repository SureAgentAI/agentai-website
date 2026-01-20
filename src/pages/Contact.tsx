import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTurnstile } from '../hooks/useTurnstile'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
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
          message: formData.get('message'),
          'cf-turnstile-response': turnstileToken,
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

  return (
    <main>
      {/* Hero with Form */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-primary-100" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or want to learn more? We'd love to hear from you.
            </p>
          </div>

          {/* Form */}
          {status === 'success' ? (
            <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
              <p className="mt-4 text-gray-600">
                We have received your message and will get back to you as soon as possible.
              </p>
              <button
                onClick={reset}
                className="mt-8 text-primary-600 hover:text-primary-700 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Fill out the form below and we'll get back to you as soon as possible.
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Practice Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company / Practice <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        minLength={10}
                        maxLength={5000}
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                      />
                    </div>
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
                  {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
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
          )}
        </div>
      </section>
    </main>
  )
}
