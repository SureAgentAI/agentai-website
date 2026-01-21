import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Users, Zap, TrendingUp, Shield, Mail, Building, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import { useTurnstile } from '../hooks/useTurnstile'

// Investor accent colors using Tailwind theme colors
const investorColors = {
  transformationCapital: 'bg-amber-500/10',
  eirPartners: 'bg-sky-400/10',
  slowVentures: 'bg-gray-100',
  oceans: 'bg-slate-800'
}

const team = [
  {
    name: 'Zorik Gordon',
    role: 'CEO',
    area: 'Product & Vision',
    bio: 'A visionary leader and serial tech entrepreneur with multiple successful exits. Founded and served as CEO of Serviz (acquired by Porch 2018), ReachLocal (NASDAQ: RLOC, acquired by Gannett 2016), and WorldWinner (acquired by Liberty Media).'
  },
  {
    name: 'Michael Gorodetsky',
    role: 'VP of Operations',
    area: 'Sales & Execution',
    bio: 'An experienced tech sales and operations leader specializing in startup growth. Led vendor acquisition at Serviz Inc. (acquired by Porch in 2018). Expert in building and scaling sales and operations teams for high-growth companies.'
  },
  {
    name: 'Sacha Brahami',
    role: 'VP of Product',
    area: 'AI & Systems',
    bio: 'A product and systems builder with a background in finance and data engineering. Leads product vision, roadmap, and delivery across AI automation and data processing. Expert in building internal tools, analytics infrastructure, and automation pipelines.'
  }
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm() {
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
          message: formData.get('message'),
          template: 'about',
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
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
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
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Get In Touch</h3>
          <p className="text-gray-600 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="about_first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="about_first_name"
              name="first_name"
              required
              minLength={2}
              maxLength={50}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="about_last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="about_last_name"
              name="last_name"
              required
              minLength={2}
              maxLength={50}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="about_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="about_email"
              name="email"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="about_phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="tel"
              id="about_phone"
              name="phone"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="about_company" className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="about_company"
              name="company"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="about_role" className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="about_role"
              name="role"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="about_message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="about_message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
            placeholder="How can we help you?"
            className={`${inputClass} resize-none`}
          />
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
        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
        </Button>

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

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Transforming <span className="gradient-text">Healthcare</span> with AI
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded in 2023 with a vision to transform the healthcare revenue cycle
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Mission & Vision */}
      <div className="py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl text-center font-bold text-gray-900 mb-6">Building the Future of Medical Billing</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              <div>
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Pioneering AI technology that automates complex billing workflows
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl text-gray-800 mb-2">Experience</h3>
                <p className="text-gray-600">
                  Deep expertise in healthcare technology and business transformation
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl text-gray-800 mb-2">Growth</h3>
                <p className="text-gray-600">
                  Rapid expansion through strategic partnerships and acquisitions
                </p>
              </div>
            </div>

            {/* Mission Statement Quote */}
            <div className="bg-gradient-to-r from-primary-100 to-white border-l-4 border-primary-500 p-8 rounded-lg text-center max-w-3xl mx-auto shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-500 mr-2" />
                <h3 className="text-sm font-semibold text-primary-500 uppercase tracking-wide">Our Mission</h3>
              </div>
              <blockquote className="text-lg text-gray-800 font-medium leading-relaxed">
                Transform the industry by using AI to automate the most complex billing and RCM tasks, empowering providers to achieve new levels of efficiency and profitability.
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl text-center font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-lg text-center text-gray-600 mb-8">
            Bringing together expertise in technology, healthcare, and business transformation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 max-w-6xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mb-6">
                  <img
                    src={`/images/team/${member.name.split(' ')[0].toLowerCase()}.png`}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <div className="text-primary-500 text-sm font-semibold mb-2">{member.area}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-gray-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investors & Advisors */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl text-center font-bold text-gray-900 mb-10">Backed by Industry Leaders</h2>

          <div className="max-w-5xl mx-auto">
            {/* Venture Firms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className={`bg-gradient-to-br ${investorColors.transformationCapital} rounded-lg p-6 text-center border shadow-md`}>
                <img
                  src="/images/external/tcap.svg"
                  alt="Transformation Capital"
                  className="h-12 mx-auto mb-4"
                />
                <div className="text-xl font-semibold text-gray-800 mb-2">Transformation Capital</div>
                <p className="text-gray-600">Growth equity firm focused on digital health and technology-enabled services companies.</p>
              </div>

              <div className={`bg-gradient-to-br ${investorColors.eirPartners} rounded-lg p-6 text-center border shadow-md`}>
                <img
                  src="/images/external/eir.jpg.png"
                  alt="EIR Partners"
                  className="h-12 mx-auto mb-4"
                />
                <div className="text-xl font-semibold text-gray-800 mb-2">EIR Partners</div>
                <p className="text-gray-600">Private equity firm focused exclusively on healthcare technology and tech-enabled services.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className={`bg-gradient-to-br ${investorColors.slowVentures} rounded-lg p-6 text-center border shadow-md`}>
                <img
                  src="/images/external/slow.png.webp"
                  alt="Slow Ventures"
                  className="h-12 mx-auto mb-4"
                />
                <div className="text-xl font-semibold text-gray-800">Slow Ventures</div>
                <p className="text-gray-600">Early-stage venture capital firm with deep expertise in consumer, fintech, SaaS, and healthcare sectors.</p>
              </div>

              <div className={`${investorColors.oceans} rounded-lg p-6 text-center shadow-lg`}>
                <img
                  src="/images/external/oceans.png"
                  alt="Oceans"
                  className="h-12 mx-auto mb-4"
                />
                <div className="text-xl font-semibold text-white mb-2">Oceans</div>
                <p className="text-gray-200">NYC-based early-stage VC firm leading pre-seed and seed deals with hands-on venture coaching.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Advisors */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl lg:text-4xl text-center font-bold text-gray-900 mb-8">Strategic Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-100">
              <div className="relative z-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Sean Rad</h4>
                <div className="text-primary-500 mb-2">Founder, Tinder</div>
                <div className="h-12">
                  <img
                    src="/images/external/tinder-logo.png"
                    alt="Sean Rad's company logo"
                    className="h-full mx-auto object-contain"
                    style={{
                      transform: 'scale(1.8)',
                      opacity: 0.7
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-100">
              <div className="relative z-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Geoffrey Price</h4>
                <div className="text-primary-500 mb-2">Co-Founder, Oak Street Health</div>
                <div className="h-12">
                  <img
                    src="/images/external/oak-street-health-logo.png"
                    alt="Geoffrey Price's company logo"
                    className="h-full mx-auto object-contain"
                    style={{
                      transform: 'scale(0.8)',
                      opacity: 0.8
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-100">
              <div className="relative z-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Howard Lerman</h4>
                <div className="text-primary-500 mb-2">Founder & CEO, Yext</div>
                <div className="h-12">
                  <img
                    src="/images/external/yext-logo.png"
                    alt="Howard Lerman's company logo"
                    className="h-full mx-auto object-contain"
                    style={{
                      transform: 'scale(0.7)',
                      opacity: 0.8
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}

            <div className="lg:col-span-5 space-y-12 lg:flex lg:flex-col lg:justify-center">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/assets/building.jpg"
                  alt="AgentAI Office"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-2">Los Angeles Office</h3>
                    <p className="text-gray-600">
                      21255 Burbank Blvd, Suite 120<br />
                      Los Angeles, CA 91367
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-2">Email</h3>
                    <a href="mailto:contact@agentai.app" className="text-gray-600 hover:text-primary-500">
                      contact@agentai.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Want to Learn More?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover how AgentAI is transforming healthcare through intelligent automation and expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg">
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
