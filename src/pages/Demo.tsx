import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'

interface FormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  role: string
  monthly_claims: string
  preferred_time: string
  message: string
  consent: boolean
}

interface ValidationErrors {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  company?: string
  role?: string
  monthly_claims?: string
  preferred_time?: string
  message?: string
  consent?: string
}

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
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    monthly_claims: '',
    preferred_time: '',
    message: '',
    consent: false,
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }))

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required'
      isValid = false
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for demo scheduling'
      isValid = false
    } else if (!/^[\d+\-() ]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
      isValid = false
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
      isValid = false
    }

    if (!formData.monthly_claims) {
      newErrors.monthly_claims = 'Please select your monthly claims volume'
      isValid = false
    }

    if (!formData.preferred_time) {
      newErrors.preferred_time = 'Please select your preferred demo time'
      isValid = false
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the privacy policy'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(
        import.meta.env.VITE_CONTACT_FORM_API_URL ||
          'https://agentai-contact-form-worker.brahami-sacha.workers.dev/contact-form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            form_type: 'demo_request',
            phone: formData.phone.replace(/\D/g, ''),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct access',
            source: window.location.href,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setSubmitStatus('success')
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        monthly_claims: '',
        preferred_time: '',
        message: '',
        consent: false,
      })

      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBaseClass =
    'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm text-gray-900'
  const inputErrorClass = 'border-red-500'
  const inputNormalClass = 'border-gray-300'

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {submitStatus === 'success' && (
        <div className="mb-8 p-4 bg-primary-50 border border-primary-200 text-primary-700 rounded-md flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary-500" />
          <div>
            <p className="font-medium">Demo request received!</p>
            <p>We'll contact you shortly to confirm your demo time.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
          <div>
            <p className="font-medium">Something went wrong.</p>
            <p>Please try again or contact us directly at info@agentai.app</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule a Demo</h3>
          <p className="text-gray-600 mb-0">
            Complete the form below to schedule a personalized demo of our AI-powered billing
            platform.
          </p>
        </div>

        <div className="md:col-span-1">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.first_name ? inputErrorClass : inputNormalClass}`}
          />
          {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.last_name ? inputErrorClass : inputNormalClass}`}
          />
          {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.phone ? inputErrorClass : inputNormalClass}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div className="md:col-span-2">
          <div className="h-px bg-gray-200 my-2"></div>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-0">Practice Information</h3>
        </div>

        <div className="md:col-span-1">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`${inputBaseClass} ${inputNormalClass}`}
          />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Your Role <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`${inputBaseClass} ${inputNormalClass}`}
          />
        </div>

        <div className="md:col-span-1">
          <label htmlFor="monthly_claims" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Claims Volume <span className="text-red-500">*</span>
          </label>
          <select
            id="monthly_claims"
            name="monthly_claims"
            value={formData.monthly_claims}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.monthly_claims ? inputErrorClass : inputNormalClass}`}
          >
            <option value="">Select volume</option>
            {monthlyClaimsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.monthly_claims && (
            <p className="mt-1 text-sm text-red-600">{errors.monthly_claims}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Demo Time <span className="text-red-500">*</span>
          </label>
          <select
            id="preferred_time"
            name="preferred_time"
            value={formData.preferred_time}
            onChange={handleChange}
            className={`${inputBaseClass} ${inputNormalClass}`}
          >
            <option value="">Select time</option>
            {preferredTimeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.preferred_time && (
            <p className="mt-1 text-sm text-red-600">{errors.preferred_time}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.message ? inputErrorClass : inputNormalClass}`}
            placeholder="Tell us about your current billing challenges and what you'd like to see in the demo..."
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={handleChange}
                className={`h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded ${errors.consent ? 'border-red-500' : ''}`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">
                I agree to the privacy policy <span className="text-red-500">*</span>
              </label>
              <p className="text-gray-500">
                By submitting this form, you agree to our{' '}
                <Link to="/privacy-policy" className="text-primary-500 hover:underline">
                  privacy policy
                </Link>
                .
              </p>
              {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Processing...' : 'Schedule Demo'}
          </Button>
          <p className="text-center text-gray-500 text-sm mt-4">
            Your information is secure and will never be shared with third parties.
          </p>
        </div>
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
