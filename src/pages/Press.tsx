import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const pressArticles = [
  {
    slug: 'agentai-series-a-round',
    title:
      'AgentAI Partners with Leading Healthcare Investors to Transform Medical Billing for U.S. Providers',
    date: 'August 18, 2025',
  },
  {
    slug: 'first-acquisition',
    title: 'AgentAI Completes First Acquisition of Physical Therapy & OT/ST Billing Company',
    date: 'September 5, 2024',
  },
  {
    slug: 'agentai-secures-4m-seed-extension',
    title: 'AgentAI Secures $4 Million to Accelerate Same-Day AI Medical Billing',
    date: 'July 15, 2024',
  },
  {
    slug: 'agentai-raises-1-8m-seed-round',
    title: 'AgentAI Raises $1.8 Million Seed Round to Transform Medical Billing With AI',
    date: 'February 1, 2024',
  },
]

export default function Press() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Press & <span className="gradient-text">Media</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">AgentAI in the news</p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="opacity-0 [@media(min-width:1730px)]:opacity-100 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Articles Section */}
      <div className="py-10">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Articles
            </h2>
            <ul className="space-y-2">
              {pressArticles.map(article => (
                <li key={article.slug}>
                  <Link
                    to={`/press/${article.slug}`}
                    className="block p-6 bg-white rounded-lg shadow-soft hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-primary-500 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about AgentAI? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                Schedule Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
