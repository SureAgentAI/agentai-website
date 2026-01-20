import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import { useContactForm } from '../hooks/useContactForm'

export default function Contact() {
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('')

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
      setFirstName('')
      setLastName('')
      setRole('')
    },
  })

  // Sync first + last name to the name field
  const handleFirstNameChange = (value: string) => {
    setFirstName(value)
    updateField('name', `${value} ${lastName}`.trim())
  }

  const handleLastNameChange = (value: string) => {
    setLastName(value)
    updateField('name', `${firstName} ${value}`.trim())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyConsent) return
    submitForm()
  }

  const canSubmit = isValid && privacyConsent && status !== 'loading' && firstName && lastName

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have a question or want to learn more? We'd love to hear from you.
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Contact Form Section - Centered */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
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
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

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
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => handleFirstNameChange(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => handleLastNameChange(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-gray-500 font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        />
                      </div>

                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                          Role <span className="text-gray-500 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900"
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
                          By submitting this form, you agree to our{' '}
                          <Link to="/privacy-policy" className="text-primary-500 hover:underline">
                            privacy policy
                          </Link>.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full"
                    >
                      {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
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
      </section>
    </main>
  )
}
