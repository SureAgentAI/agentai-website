import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              How we protect and handle your information
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 group no-underline"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <p className="text-sm text-gray-500 mb-8">Last updated: January 20, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              At AgentAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-powered revenue cycle management services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out forms on our website</li>
              <li>Register for our services or request a demo</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us for support</li>
              <li>Enter into a business relationship with us</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information (email, phone number)</li>
              <li>Company or practice name</li>
              <li>Job title and role</li>
              <li>Message content and inquiry details</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Access times and dates</li>
              <li>Pages viewed and navigation paths</li>
              <li>Referring website addresses</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Communicate with you about our products and services</li>
              <li>Send you marketing and promotional materials (with your consent)</li>
              <li>Monitor and analyze usage patterns to improve our website</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes. We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations (subject to confidentiality agreements)</li>
              <li>Professional advisors (legal, accounting, etc.)</li>
              <li>Business partners in connection with services you request</li>
              <li>Law enforcement when required by law or to protect our rights</li>
            </ul>

            <h2>5. HIPAA Compliance</h2>
            <p>
              As a healthcare technology company providing revenue cycle management services, we are committed to maintaining the privacy and security of protected health information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA).
            </p>
            <p className="font-semibold text-gray-900">
              Do not submit any Protected Health Information (PHI) through our public website forms.
            </p>
            <p>
              This includes patient names, dates of birth, Social Security numbers, medical records, or any other individually identifiable health information. For PHI handling, separate Business Associate Agreements (BAAs) govern our relationships with healthcare clients.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure data storage with access controls</li>
              <li>Regular security assessments and audits</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>7. Cookies and Analytics</h2>
            <p>
              We use cookies and similar tracking technologies to understand how visitors interact with our website. This helps us improve our services and measure the effectiveness of our communications.
            </p>
            <p>
              You can control cookie preferences through your browser settings. Note that disabling cookies may affect certain website functionality.
            </p>
            <p>
              You can opt out of Google Analytics tracking by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>

            <h2>8. Service Providers</h2>
            <p>We use the following categories of service providers to operate our website and services:</p>
            <ul>
              <li><strong>Cloud Infrastructure</strong> &ndash; Website hosting and computing services</li>
              <li><strong>Analytics</strong> &ndash; Usage tracking to improve our services</li>
              <li><strong>Email Services</strong> &ndash; Communication and form submission delivery</li>
              <li><strong>Security</strong> &ndash; Protection against malicious traffic and spam</li>
            </ul>
            <p>
              These providers process data on our behalf and are contractually obligated to protect your information.
            </p>

            <h2>9. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal information we hold</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information below.
            </p>

            <h2>10. California Privacy Rights</h2>
            <p>
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and how it&apos;s used, and the right to request deletion. We do not sell personal information.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              <strong>AgentAI, Inc.</strong><br />
              Email:{' '}
              <a href="mailto:privacy@agentai.app" className="text-primary-600 hover:text-primary-700">
                privacy@agentai.app
              </a><br />
              Phone: 1-310-439-8842<br />
              Address: 21255 Burbank Blvd, Suite 120, Woodland Hills, CA 91367
            </p>

            <h2>12. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after any changes indicates your acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
