import { Link } from 'react-router-dom'

const footerLinks = {
  solutions: [
    { label: 'Home', href: '/' },
    { label: 'Product', href: '/product' },
  ],
  company: [
    { label: 'Partner', href: '/partner' },
    { label: 'About', href: '/about' },
  ],
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-site">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <Link to="/" className="inline-block">
                  <img
                    src="/images/assets/logo.png"
                    alt="AgentAI"
                    className="h-10 w-auto"
                  />
                </Link>
                <a
                  href="https://www.linkedin.com/company/agentaiapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all duration-200"
                  aria-label="Follow us on LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-sm">
                Revolutionizing Medical Billing
              </p>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                {/* Solutions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Solutions
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {footerLinks.solutions.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-primary-500 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-primary-500 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Contact
                  </h3>
                  <div className="mt-4 space-y-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-all duration-200 hover:shadow-md"
                    >
                      Contact Us
                    </Link>
                    <div>
                      <a
                        href="mailto:contact@agentai.app"
                        className="text-gray-600 hover:text-primary-500 transition-colors duration-200"
                      >
                        contact@agentai.app
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AgentAI, Inc. All rights reserved.
            </p>
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-500 hover:text-primary-500 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
