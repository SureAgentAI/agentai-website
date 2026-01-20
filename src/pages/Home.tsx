import { Link } from 'react-router-dom'
import {
  CheckCircle,
  Building2,
  Building,
  Hospital,
  Shield,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
  Users,
} from 'lucide-react'
import Button from '../components/ui/Button'
import RCMWheel from '../components/RCMWheel'

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-green-50 to-green-100 py-20">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Medical Billing with{' '}
                <span className="gradient-text">AI-Powered Speed</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Accelerate your revenue cycle with AgentAI&apos;s revolutionary suite of tools. Our
                unique combination of intelligent automation and expert billing specialists delivers
                unprecedented revenue cycle performance.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary-500" />
                  <span className="text-sm text-gray-600">Process claims within hours not days</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary-500" />
                  <span className="text-sm text-gray-600">10x faster turnaround for denials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-primary-500" />
                  <span className="text-sm text-gray-600">No more errors or manual data entry</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="w-full max-w-4xl mx-auto">
                <img
                  src="/images/assets/platform.svg"
                  alt="AgentAI Platform Interface"
                  className="w-full h-auto scale-125"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Who We Help Section */}
      <section className="pt-10 pb-2 bg-white">
        <div className="container-site">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Providers Nationwide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From independent practices to enterprise healthcare systems, AgentAI delivers
              consistent results across all practice sizes and specialties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12">
            {[
              {
                icon: Building2,
                title: 'Independent Medical Practices',
                description:
                  'Transform your revenue cycle with AI-powered automation that scales with your growth',
                benefits: [
                  'Same-day claims processing',
                  'Reduced administrative burden',
                  'Improved cash flow',
                ],
              },
              {
                icon: Building,
                title: 'Medical Billing & RCM Companies',
                description: 'Scale your services with AI-powered efficiency and expert support',
                benefits: [
                  '10x faster turnaround',
                  'Increased client satisfaction',
                  'Higher profit margins',
                ],
              },
              {
                icon: Hospital,
                title: 'Hospitals & Healthcare Systems',
                description:
                  'Enterprise-grade solutions that integrate seamlessly with complex workflows',
                benefits: ['Multi-location support', 'Advanced analytics', 'Custom integrations'],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card p-8 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={48} className="text-primary-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {item.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center justify-center gap-2">
                      <CheckCircle size={16} className="text-primary-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview Bridge */}
      <section className="py-10 bg-gray-50">
        <div className="container-site">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              AI + Human Expertise = Unmatched Results
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our platform combines cutting-edge AI automation with seasoned billing specialists to
              deliver the fastest, most accurate medical billing experience in the industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Automation',
                  description:
                    'Same-day claims processing with intelligent coding and denial management',
                },
                {
                  icon: Users,
                  title: 'Expert Human Support',
                  description:
                    'Seasoned specialists handle complex cases and strategic optimization',
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'HIPAA-compliant platform with enterprise-grade security',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-500/10 rounded-lg">
                      <item.icon size={32} className="text-primary-500" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <Link
              to="/product"
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-colors"
            >
              Explore Our Platform Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Seamless Integration Into Your Current Workflow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;ve designed AgentAI to seamlessly integrate into your current workflow,
              effortlessly connecting with a wide range of EMR and EHR systems.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <RCMWheel />
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The streamlined process will quickly help automate a large portion of your coding and
              billing tasks, allowing your team to focus on what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Experience the Future of Medical Billing
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of practices that have already transformed their revenue cycle with
              AgentAI&apos;s intelligent automation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg">
                  Schedule Demo
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
