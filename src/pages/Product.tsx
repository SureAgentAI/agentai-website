import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  ClipboardCheck,
  Binary,
  FileSearch,
  Shield,
  ArrowRight,
  TrendingUp,
  Zap,
  Users,
  Lock,
} from 'lucide-react'
import Button from '../components/ui/Button'

// Security Feature Carousel Component
function SecurityFeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Continuous Monitoring',
      description: '24/7 infrastructure monitoring with automated threat detection',
      details: 'Real-time security monitoring, automated alerts, and proactive threat prevention',
    },
    {
      icon: CheckCircle,
      title: 'Secure Development',
      description: 'Security-first development practices with regular assessments',
      details: 'Regular security audits, penetration testing, and secure coding standards',
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'Multi-layered data protection with encryption and access controls',
      details: 'End-to-end encryption, role-based access, and comprehensive audit logging',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % securityFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary-500/10 rounded-full">
            {(() => {
              const IconComponent = securityFeatures[currentIndex].icon
              return <IconComponent size={36} className="text-primary-500" />
            })()}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {securityFeatures[currentIndex].title}
        </h3>
        <p className="text-base text-gray-600 mb-3">
          {securityFeatures[currentIndex].description}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
          {securityFeatures[currentIndex].details}
        </p>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-auto pb-4">
        {securityFeatures.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary-500 w-6'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Product() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Built for <span className="gradient-text">Performance</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Unmatched results in medical billing and revenue cycle management. Discover how.
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Core Platform Features */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three powerful pillars that work together to transform your revenue cycle
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid lg:grid-cols-3 gap-2 md:gap-8 mb-10">
            {[
              {
                icon: Zap,
                title: 'AI-Powered Automation',
                description: 'Intelligent claims processing that learns and improves over time',
                features: [
                  'Same-day claims processing',
                  'Automated coding with CPT/ICD-10',
                  'Smart denial identification',
                  'Practice-specific rule application',
                ],
              },
              {
                icon: Users,
                title: 'Expert Human Support',
                description: 'Seasoned specialists handle complex cases and strategic optimization',
                features: [
                  'Complex case resolution',
                  'Strategic payer negotiations',
                  'Revenue optimization',
                  'Personalized guidance',
                ],
              },
              {
                icon: TrendingUp,
                title: 'Smart Denial Management',
                description: 'Turn denials into approvals with intelligent appeal strategies',
                features: [
                  'Instant denial categorization',
                  'Automated appeal generation',
                  'Expert follow-up',
                  'Improved recovery rates',
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-500/10 rounded-full">
                    <feature.icon size={48} className="text-primary-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-primary-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Submit',
                  description: 'Upload claims or integrate with your EMR',
                  icon: FileSearch,
                  details: 'Seamless integration with major EMR systems or simple file upload',
                },
                {
                  step: '2',
                  title: 'Process',
                  description: 'AI analyzes and codes automatically',
                  icon: Binary,
                  details: 'Advanced AI algorithms process claims in real-time with 99.9% accuracy',
                },
                {
                  step: '3',
                  title: 'Review',
                  description: 'Experts handle complex cases and denials',
                  icon: ClipboardCheck,
                  details:
                    'Specialized teams review edge cases and optimize for maximum reimbursement',
                },
                {
                  step: '4',
                  title: 'Collect',
                  description: 'Faster payments and higher recovery rates',
                  icon: TrendingUp,
                  details: 'Track performance metrics and see improved cash flow within 30 days',
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-primary-500/15 to-primary-500/25 rounded-xl group-hover:from-primary-500/25 group-hover:to-primary-500/35 transition-all duration-300 shadow-md">
                      {(() => {
                        const IconComponent = item.icon
                        return <IconComponent size={28} className="text-primary-500" />
                      })()}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-10 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Security & Compliance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your data security and patient privacy are our top priorities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-500/10 rounded-lg">
                  <Lock className="text-primary-500" size={28} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  HIPAA Compliant by Design
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform is built from the ground up to meet and exceed HIPAA requirements. We
                implement comprehensive safeguards to protect your patients' sensitive information.
              </p>
              <ul className="space-y-3">
                {[
                  'End-to-end encryption for all data in transit and at rest',
                  'Role-based access controls with principle of least privilege',
                  'Comprehensive audit logging and monitoring',
                  'Regular security assessments and compliance audits',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="card p-8 h-80 max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-500/10 rounded-xl"></div>
                <div className="relative z-10 h-full">
                  <SecurityFeatureCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Ready to Transform Your Revenue Cycle?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              See how AgentAI's powerful features can revolutionize your medical billing operations
              and drive better results for your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg">
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="secondary" size="lg">
                  Back to Home
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
