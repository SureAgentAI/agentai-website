import { Link, useParams, Navigate } from 'react-router-dom'

interface ArticleData {
  title: string
  lead?: string
  date: string
  location: string
  content: React.ReactNode
}

const articles: Record<string, ArticleData> = {
  'agentai-raises-1-8m-seed-round': {
    title: 'AgentAI Raises $1.8 Million Seed Round to Transform Medical Billing With AI',
    lead: 'Funding led by Oceans Ventures; angel investors include Sean Rad, Geoffrey Price, and Howard Lerman',
    date: 'February 1, 2024',
    location: 'LOS ANGELES',
    content: (
      <>
        <p>
          AgentAI, the company revolutionizing healthcare revenue-cycle management through artificial
          intelligence, today announced it has closed a $1.8 million seed round led by{' '}
          <a
            href="https://oceans.ventures/team/?utm_source=chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oceans Ventures
          </a>
          . The round also attracted leading technology entrepreneurs Sean Rad (founder of Tinder),
          Geoffrey Price, and Howard Lerman.
        </p>
        <blockquote>
          <p>
            "Artificial intelligence is finally capable of automating the vast majority of billing
            and RCM workflows. This capital lets us accelerate product development and bring
            AI-driven efficiency to medical billers and coders everywhere."
          </p>
          <footer>- Zorik Gordon, CEO of AgentAI</footer>
        </blockquote>
        <blockquote>
          <p>
            "Oceans Ventures backs founders who use technology to unlock massive operational
            improvements. AgentAI's platform frees revenue-cycle professionals from repetitive tasks
            so they can focus on higher-value work — it's exactly the kind of impact we look for."
          </p>
          <footer>
            -{' '}
            <a
              href="https://oceans.ventures/team/?utm_source=chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steven Rosenblatt
            </a>
            , Partner at Oceans Ventures
          </footer>
        </blockquote>
        <p>
          The new funding will be used to expand AgentAI's engineering team, deepen integration with
          EHR and practice-management systems, and support early pilot customers as the company
          prepares for broader market launch.
        </p>

        <h2>About AgentAI</h2>
        <p>
          Founded in 2023, AgentAI applies advanced artificial-intelligence models to automate
          complex medical billing and revenue-cycle processes. By handling claims coding,
          submission, and denial management autonomously, AgentAI reduces costs and speeds
          reimbursement for healthcare organizations, allowing human experts to focus on strategic,
          high-value tasks.
        </p>

        <h2>About Oceans</h2>
        <p>
          Oceans is a New York–based seed-stage venture capital firm that invests in
          technology-driven teams at the pre-seed and seed stages. Acting as "venture coaches," the
          firm partners closely with founders to accelerate growth and build enduring businesses. (
          <a
            href="https://oceans.ventures/team/?utm_source=chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oceans Team
          </a>
          )
        </p>
      </>
    ),
  },
  'agentai-secures-4m-seed-extension': {
    title: 'AgentAI Secures $4 Million to Accelerate Same-Day AI Medical Billing',
    lead: 'Slow Ventures leads July seed extension; Oceans Ventures doubles down',
    date: 'July 15, 2024',
    location: 'LOS ANGELES',
    content: (
      <>
        <p>
          AgentAI, the pioneer of same-day, AI-powered medical-billing automation, today announced a
          $4 million financing led by Slow Ventures, with continued participation from existing
          investor Oceans Ventures.
        </p>
        <blockquote>
          <p>
            "AgentAI is shrinking a week-long billing cycle to minutes while preserving the human
            expertise practices rely on. Their blend of intelligent automation, expert billers, and
            a proven playbook for acquiring RCM firms makes them the most comprehensive solution
            we've seen."
          </p>
          <footer>- Will Quist, Partner at Slow Ventures</footer>
        </blockquote>
        <blockquote>
          <p>
            "Slow's backing—alongside our partners at Oceans—lets us scale same-day claims
            processing and grow through acquisitions of medical-billing companies that want to
            unlock premium valuations through AI."
          </p>
          <footer>- Zorik Gordon, CEO of AgentAI</footer>
        </blockquote>

        <h2>Why Providers and Billers Choose AgentAI</h2>
        <ul>
          <li>
            <strong>Speed</strong> — Claims and denials processed within hours
          </li>
          <li>
            <strong>Accuracy</strong> — 99 % first-pass success rate
          </li>
          <li>
            <strong>Efficiency</strong> — Up to 80 % reduction in administrative workload
          </li>
          <li>
            <strong>Acquisition Model</strong> — Offers billing-company owners premium valuations
            and flexible deal structures, then applies AI to cut processing time from days to 24
            hours and automate majority of manual tasks
          </li>
        </ul>

        <h2>About AgentAI</h2>
        <p>
          Founded in 2023, AgentAI pairs advanced machine learning with seasoned billing specialists
          to deliver same-day revenue-cycle performance for practices, hospitals, and RCM companies.
          Through its acquisition program, AgentAI provides medical-billing owners premium
          valuations and the opportunity to share in future growth.
        </p>

        <h2>About Slow Ventures</h2>
        <p>
          Slow Ventures is an early-stage venture capital firm with offices in San Francisco,
          Boston, and New York. A generalist investor, Slow backs founders at the earliest stages
          and supports them over the long haul on their journey to build enduring companies.
        </p>
      </>
    ),
  },
  'agentai-series-a-round': {
    title:
      'AgentAI Partners with Leading Healthcare Investors to Transform Medical Billing for U.S. Providers',
    date: 'August 20, 2025',
    location: 'LOS ANGELES',
    content: (
      <>
        <p>
          AgentAI, the AI platform transforming the revenue cycle management (RCM) industry, today
          announced it has secured a significant growth investment co-led by Transformation Capital,
          a leading growth equity firm in digital health, and EIR Partners, a private equity firm
          focused on healthcare technology.
        </p>

        <p>
          The new capital will accelerate AgentAI's strategy of acquiring small and medium-sized
          medical billing companies and integrating its proprietary AI technology to deliver
          superior results for their healthcare provider clients. The company's platform automates
          the majority of manual RCM tasks, shrinking a week-long billing cycle to a matter of
          hours, and dramatically improving financial outcomes for providers.
        </p>

        <blockquote>
          <p>
            "AgentAI is addressing one of the most critical and inefficient areas in healthcare,"
            said Mike Dixon, Managing Partner at Transformation Capital. "By automating
            high-friction RCM workflows – AgentAI has a proven track record of reducing billing
            errors and accelerating collections for specialty provider groups. We're thrilled to
            partner with Zorik and the AgentAI team to deliver a better billing experience for
            providers—so clinicians can spend more time with patients and less on practice
            operations."
          </p>
        </blockquote>

        <blockquote>
          <p>
            "The RCM market is fragmented and ripe for technological disruption," said Brett
            Carlson, Partner at EIR Partners. "AgentAI's strategy of acquiring smaller billing
            companies and supercharging their operations with a proprietary AI platform is
            incredibly compelling. They are building a new kind of RCM leader, and we are excited to
            support their aggressive growth and acquisition roadmap."
          </p>
        </blockquote>

        <p>
          This investment will be used to enhance AgentAI's platform and expand its acquisition
          capacity nationwide. The platform has demonstrated significant RCM improvements for
          providers, including achieving ~99% clean-claim rates, accelerating provider payments by
          up to 40%, and reducing aged accounts receivable by nearly 75%.
        </p>

        <blockquote>
          <p>
            "Partnering with firms of the caliber of Transformation Capital and EIR Partners, who
            collectively manage over $2.3 billion in assets, is a powerful endorsement of our vision
            and strategy," said Zorik Gordon, CEO of AgentAI. "This capital will allow us to
            accelerate our acquisition strategy, scale our technology, and bring same-day billing
            and unprecedented financial outcomes to even more healthcare providers across the
            country."
          </p>
        </blockquote>

        <h2>About AgentAI</h2>
        <p>
          AgentAI pairs advanced AI with seasoned billing specialists to deliver same-day
          revenue-cycle performance for practices, hospitals, and RCM companies. Through its
          acquisition program, AgentAI provides medical-billing owners with premium valuations and
          the opportunity to share in future growth by leveraging its industry-leading AI automation
          platform.
        </p>

        <h2>About Transformation Capital</h2>
        <p>
          Transformation Capital is a growth equity firm focused on investments in digital health
          and technology-enabled services companies. With over $1.6B in assets under management, the
          firm is dedicated to supporting innovative companies that are improving the healthcare
          system by lowering costs, improving access, and enhancing the quality of care.
        </p>

        <h2>About EIR Partners</h2>
        <p>
          EIR Partners is a private equity firm focused on investing in the healthcare technology
          and tech-enabled services sectors. The firm partners with exceptional management teams to
          build industry-leading companies that are driving innovation and efficiency in healthcare.
        </p>

        <h2>Media Contact</h2>
        <p>
          <strong>Michael Gorodetsky</strong>
          <br />
          VP of Operations
          <br />
          <a href="mailto:press@agentai.app" className="text-primary-500 hover:underline">
            press@agentai.app
          </a>
        </p>
      </>
    ),
  },
  'first-acquisition': {
    title: 'AgentAI Completes First Acquisition of Physical Therapy & OT/ST Billing Company',
    lead: 'Acquisition accelerates same-day claims processing for physical, occupational & speech therapy, mental-health, and chiropractic providers',
    date: 'September 5, 2024',
    location: 'LOS ANGELES',
    content: (
      <>
        <p>
          AgentAI today announced the completion of its first acquisition, acquiring a 23-year-old
          revenue-cycle management firm serving physical, occupational, and speech therapy clinics
          as well as mental-health and chiropractic practices. The deal deepens AgentAI's specialty
          expertise and expands its nationwide customer footprint.
        </p>
        <blockquote>
          <p>
            "Therapy, and mental-health providers face unique billing complexities and chronic
            payment delays. By combining the acquired company's domain knowledge with our same-day
            AI platform, we'll cut processing times from weeks to hours and unlock faster cash flow
            for clinicians."
          </p>
          <footer>- Zorik Gordon, CEO of AgentAI</footer>
        </blockquote>
        <p>
          The integration plan includes migrating the acquired company's workflows onto AgentAI's
          cloud platform, introducing real-time denial analytics, and rolling out specialty-specific
          coding automation by early 2025. Existing customers of the acquired company will gain
          access to AgentAI's 28-second average claim-touch time and 99 % first-pass-success rate,
          while benefiting from enhanced reporting and HIPAA-grade security.
        </p>

        <h2>About AgentAI</h2>
        <p>
          Founded in 2023, AgentAI pairs advanced artificial intelligence with expert billers to
          deliver same-day revenue-cycle performance for medical practices, hospitals, and RCM
          companies. Through its acquisition program, AgentAI provides billing-company owners
          premium valuations and opportunities to share in future growth.
        </p>
      </>
    ),
  },
}

export default function PressArticle() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !articles[slug]) {
    return <Navigate to="/press" replace />
  }

  const article = articles[slug]

  return (
    <main>
      <div className="py-10">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            {/* Back to Press link */}
            <div className="mb-8">
              <Link to="/press" className="text-primary-500 hover:underline">
                &larr; Back to Press
              </Link>
            </div>

            {/* Article Content */}
            <article className="prose lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-li:text-gray-600 prose-strong:text-gray-900">
              <h1>{article.title}</h1>
              {article.lead && <p className="lead text-lg text-gray-500 italic">{article.lead}</p>}
              <p className="text-sm text-gray-500">
                {article.location} — {article.date}
              </p>

              {article.content}
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}
