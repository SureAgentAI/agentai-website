import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container-site py-16">
        {/* Main grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="block cursor-pointer mb-2">
              <img
                src="/images/assets/logo.png"
                alt="AgentAI"
                className="h-12 w-auto -ml-[6px]"
              />
            </Link>
            <div className="text-gray-600 text-base leading-relaxed max-w-md">
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                Revolutionizing Medical Billing with the Power of AI
                <a
                  href="https://www.linkedin.com/company/agentaiapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block ml-2.5 mb-2 text-gray-400 hover:text-primary-500 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 inline -mt-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </p>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-2">
              SOLUTIONS
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-500 transition-colors duration-200 text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="text-gray-600 hover:text-primary-500 transition-colors duration-200 text-base"
                >
                  Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-2">
              COMPANY
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/partner"
                  className="text-gray-600 hover:text-primary-500 transition-colors duration-200 text-base"
                >
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-500 transition-colors duration-200 text-base"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">
              CONTACT
            </h3>
            <Link to="/contact" className="block mb-4">
              <button className="bg-primary-500 hover:bg-primary-600 text-white p-2 text-sm rounded-lg -mt-6 -mb-1 transition-colors">
                Contact Us
              </button>
            </Link>
            <p className="text-gray-600 text-base">
              <a
                href="mailto:contact@agentai.app"
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                contact@agentai.app
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} AgentAI, Inc. All rights reserved.
            </p>
            <Link
              to="/privacy-policy"
              className="text-gray-500 text-sm hover:text-primary-500 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
