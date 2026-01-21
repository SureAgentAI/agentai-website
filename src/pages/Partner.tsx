import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Zap,
  Handshake,
  Target,
  BarChart3,
  Calendar,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import Button from '../components/ui/Button'

export default function Partner() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Join the Future of <span className="gradient-text">Medical Billing</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Partner with AgentAI to maximize your business value and transform your operations
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Why Partner with AgentAI Section */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Partner with AgentAI?
            </h2>
            <p className="text-lg text-gray-600">
              We're not just another software company. We're your strategic partner in building a more valuable, efficient, and scalable medical billing business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-2">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Value Creation</h3>
              <p className="text-gray-600">
                Our partners consistently achieve 40-60% EBITDA margins and 3-5x valuation multiples through operational excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technology Transformation</h3>
              <p className="text-gray-600">
                Leverage AI-powered automation to eliminate manual processes, reduce errors, and scale operations efficiently.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Partnership</h3>
              <p className="text-gray-600">
                We invest in your success with ongoing support, training, and strategic guidance throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Process Section */}
      <section className="py-10 bg-gray-50">
        <div className="rounded-2xl px-8 md:px-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6">
            Our Partnership Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Assessment',
                description: 'Comprehensive evaluation of your current operations and growth potential',
                icon: Target,
                details: 'Deep dive analysis of processes, technology stack, and market opportunities',
              },
              {
                step: '2',
                title: 'Strategy',
                description: 'Custom roadmap for technology implementation and operational optimization',
                icon: BarChart3,
                details: 'Tailored transformation plan with clear milestones and success metrics',
              },
              {
                step: '3',
                title: 'Implementation',
                description: 'Seamless platform integration with minimal disruption to your business',
                icon: Zap,
                details: 'Phased rollout with dedicated support team and comprehensive training',
              },
              {
                step: '4',
                title: 'Growth',
                description: 'Ongoing optimization and expansion support to maximize your success',
                icon: TrendingUp,
                details: 'Continuous improvement, scaling strategies, and new market expansion',
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
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="max-w-6xl mx-auto">
            {/* Case Study Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                CASE STUDY
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Achieving 50%+ EBITDA: A 90-Day Acquisition Turnaround
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how AgentAI transforms medical billing operations and creates exceptional value for our partners
              </p>
            </div>

            {/* Case Study Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-2">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Challenge, Solution, Timeline */}
                <div className="p-8 lg:p-12 space-y-8">
                  {/* The Challenge */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">The Challenge</h3>
                    <p className="text-gray-600 mb-4">
                      In August 2024, a newly acquired medical billing service for 22 clinic locations was burdened by high operational costs and manual, error-prone processes.
                    </p>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-red-800 text-sm font-medium">
                        These inefficiencies resulted in a <span className="font-bold">negative EBITDA margin of -20%</span> on $1.2M in annual revenue, threatening the viability of the business.
                      </p>
                    </div>
                  </div>

                  {/* The Solution */}
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">The Solution</h3>
                    <p className="text-gray-600 mb-4">
                      AgentAI implemented its intelligent, end-to-end automation platform, centralizing the entire billing operation.
                    </p>
                    <div className="bg-primary-50 rounded-lg p-4">
                      <p className="text-primary-800 text-sm font-medium">
                        By automating the revenue cycle from claim creation to payment posting, AgentAI streamlined workflows and eliminated costly operational bottlenecks, leading to a full transformation by February 2025.
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">August 2024: Initial assessment and platform implementation</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">November 2024: First 90-day results achieved</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">February 2025: Full transformation complete</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Key Results */}
                <div className="bg-gray-50 p-8 lg:p-10">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Dramatic Profit Swing</p>
                          <p className="text-sm text-gray-600">EBITDA margin improved from -8.5% to 50.2% in the first 90 days</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">73% Lower Operating Expenses</p>
                          <p className="text-sm text-gray-600">Annual costs reduced from $1.4M to $375K through process automation</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Payments Accelerated by 22 Days</p>
                          <p className="text-sm text-gray-600">Slashed average time to get paid, significantly improving cash flow</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Claim Denials Cut by 62.5%</p>
                          <p className="text-sm text-gray-600">Boosted revenue capture and efficiency by ensuring claim accuracy</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">74.9% Reduction in Aged A/R</p>
                          <p className="text-sm text-gray-600">Cleared out old, difficult-to-collect revenue by revitalizing collections</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">9.7 Point Increase in Collection Rate</p>
                          <p className="text-sm text-gray-600">Achieved a near-perfect net collection rate</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">100% Client Retention & Growth</p>
                          <p className="text-sm text-gray-600">Retained all core clients while adding 20% in new monthly recurring revenue</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the growing number of medical billing companies achieving exceptional results with AgentAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="secondary" size="lg">
                  Request Demo
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
