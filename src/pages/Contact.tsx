import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import { useContactForm } from '../hooks/useContactForm'

export default function Contact() {
  const [privacyConsent, setPrivacyConsent] = useState(false)

  const {
    formData,
    updateField,
    submitForm,
    resetForm,
    status,
    error,
    turnstileRef,
    isValid,
  } = useContactForm({
    onSuccess: () => {
      setPrivacyConsent(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyConsent) return
    submitForm()
  }

  const canSubmit = isValid && privacyConsent && status !== 'loading'

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our AI-powered healthcare solutions? We'd love to hear from you.
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Ready to transform your healthcare revenue cycle? Contact us today to learn how AgentAI can help your organization.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:contact@agentai.app" className="text-gray-600 hover:text-primary-500 transition-colors">
                      contact@agentai.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Phone</h3>
                    <a href="tel:1-310-439-8842" className="text-gray-600 hover:text-primary-500 transition-colors">
                      1-310-439-8842
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-600">
                      21255 Burbank Blvd, Suite 120<br />
                      Woodland Hills, CA 91367
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                    <p className="text-gray-600 mb-8">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={resetForm} variant="secondary">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    {status === 'error' && error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Something went wrong</p>
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone <span className="text-gray-500 font-normal">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company <span className="text-gray-500 font-normal">(optional)</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={(e) => updateField('company', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                          placeholder="How can we help you?"
                        />
                      </div>

                      {/* Turnstile Widget Container */}
                      <div ref={turnstileRef} className="flex justify-center"></div>

                      {/* Privacy Consent Checkbox */}
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy-consent"
                            type="checkbox"
                            checked={privacyConsent}
                            onChange={(e) => setPrivacyConsent(e.target.checked)}
                            className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy-consent" className="text-gray-700">
                            I agree to the{' '}
                            <Link to="/privacy-policy" className="text-primary-500 hover:underline">
                              privacy policy
                            </Link>{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <p className="text-gray-500 text-xs mt-1">
                            By submitting this form, you agree to our privacy policy and consent to being contacted about our services.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full"
                      >
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                      </Button>

                      <p className="text-center text-gray-500 text-sm">
                        Your information is secure and will never be shared with third parties.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
