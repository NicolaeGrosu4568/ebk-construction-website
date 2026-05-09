import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | EBK Construction LTD",
  description: "Privacy Policy for EBK Construction LTD — how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero */}
      <section className="bg-[#1a3a6b] pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">Legal</p>
          <h1 className="font-barlow font-bold text-5xl text-white">Privacy Policy</h1>
          <p className="text-white/60 mt-4 text-sm">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-sm shadow-sm p-8 sm:p-12 space-y-10 text-gray-600 leading-relaxed">

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">1. Who We Are</h2>
              <p>
                EBK Construction LTD is a carpentry, joinery, and interior fit-out company registered in England and Wales.
                Our registered address is <strong>{SITE.address}</strong>. You can contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-[#c8a96e] hover:underline">{SITE.email}</a> or by telephone on{" "}
                <a href={`tel:${SITE.phone}`} className="text-[#c8a96e] hover:underline">{SITE.phoneDisplay}</a>.
              </p>
              <p className="mt-3">
                We are committed to protecting your personal data and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">2. What Data We Collect</h2>
              <p>We collect personal data only when you voluntarily provide it to us. This includes:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong>Contact form submissions</strong> — your name, email address, phone number, and the message you send us</li>
                <li><strong>Testimonial submissions</strong> — your name, role or company, and the review you submit via our website</li>
                <li><strong>Communications</strong> — any emails or messages you send us directly</li>
              </ul>
              <p className="mt-3">
                We do not collect any special category data (such as health information), and we do not collect payment card details through this website.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">3. How We Use Your Data</h2>
              <p>We use the personal data you provide for the following purposes:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>To respond to your enquiry or quote request</li>
                <li>To communicate with you about your project</li>
                <li>To review and, if approved, display your testimonial on our website</li>
                <li>To improve our services and website</li>
              </ul>
              <p className="mt-3">
                Our lawful basis for processing your data is <strong>legitimate interests</strong> — specifically, responding to enquiries from potential clients — and, where applicable, your <strong>consent</strong> (for testimonial submissions).
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">4. How Long We Keep Your Data</h2>
              <p>We retain your personal data only for as long as necessary:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong>Enquiries</strong> — retained for up to 2 years from the date of submission, or until the project is completed and any follow-up communication has concluded</li>
                <li><strong>Testimonials</strong> — retained for as long as they remain published on the site, or until you request removal</li>
              </ul>
              <p className="mt-3">After this period, your data is securely deleted.</p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">5. Who We Share Your Data With</h2>
              <p>We do not sell, rent, or trade your personal data. We may share it with:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong>Supabase</strong> — our database and hosting provider, used to securely store your enquiries and submissions (data stored within the EU/UK)</li>
                <li><strong>Resend</strong> — our email delivery provider, used to send notification emails to our team when you submit an enquiry</li>
              </ul>
              <p className="mt-3">Both providers operate under appropriate data processing agreements and comply with UK GDPR requirements.</p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">6. Cookies and Analytics</h2>
              <p>
                Our website may use cookies and similar technologies to understand how visitors use the site. Where we use analytics tools (such as Google Analytics), we will obtain your consent via our cookie consent banner before any tracking cookies are set.
              </p>
              <p className="mt-3">
                You can withdraw your consent at any time by clearing your browser cookies and declining consent on your next visit.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">7. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong>Access</strong> the personal data we hold about you</li>
                <li><strong>Rectify</strong> any inaccurate or incomplete data</li>
                <li><strong>Erase</strong> your data (the "right to be forgotten")</li>
                <li><strong>Restrict</strong> how we process your data</li>
                <li><strong>Object</strong> to our processing of your data</li>
                <li><strong>Withdraw consent</strong> at any time, where processing is based on consent</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-[#c8a96e] hover:underline">{SITE.email}</a>.
                We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">8. Complaints</h2>
              <p>
                If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the{" "}
                <strong>Information Commissioner's Office (ICO)</strong> — the UK's data protection regulator — at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#c8a96e] hover:underline">ico.org.uk</a>{" "}
                or by calling 0303 123 1113.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                For any questions about this Privacy Policy, contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-[#c8a96e] hover:underline">{SITE.email}</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
