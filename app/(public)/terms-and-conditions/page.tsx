import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions | EBK Construction LTD",
  description: "Terms and Conditions for EBK Construction LTD — please read before using our website or engaging our services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero */}
      <section className="bg-[#1a3a6b] pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">Legal</p>
          <h1 className="font-barlow font-bold text-5xl text-white">Terms & Conditions</h1>
          <p className="text-white/60 mt-4 text-sm">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-sm shadow-sm p-8 sm:p-12 space-y-10 text-gray-600 leading-relaxed">

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">1. About Us</h2>
              <p>
                These Terms and Conditions govern your use of the EBK Construction LTD website located at{" "}
                <strong>ebkconstruction.co.uk</strong> and any services provided by us.
              </p>
              <p className="mt-3">
                EBK Construction LTD is a company registered in England and Wales. Our registered address is{" "}
                <strong>{SITE.address}</strong>. You can contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-[#c8a96e] hover:underline">{SITE.email}</a>.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">2. Use of This Website</h2>
              <p>By accessing and using this website, you agree to these Terms and Conditions. If you do not agree, please do not use this website.</p>
              <p className="mt-3">You agree not to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Use this website for any unlawful purpose</li>
                <li>Attempt to gain unauthorised access to any part of the website or its systems</li>
                <li>Transmit any harmful, offensive, or disruptive content via any form on this website</li>
                <li>Use automated tools to scrape, copy, or extract content from this website without our written permission</li>
              </ul>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">3. Website Content</h2>
              <p>
                The content on this website — including text, images, project descriptions, and service information — is provided for general informational purposes only. While we make every effort to ensure accuracy, we do not guarantee that the information is complete, current, or error-free.
              </p>
              <p className="mt-3">
                Nothing on this website constitutes a binding quote, offer, or contract. All prices mentioned are indicative only. A formal written quote will be provided following a site visit or detailed consultation.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">4. Enquiries and Quotes</h2>
              <p>
                Submitting an enquiry via our contact form does not create a contractual obligation on either party. We will endeavour to respond to all enquiries within 2 business days, but we cannot guarantee a specific response time.
              </p>
              <p className="mt-3">
                Any quotation provided by EBK Construction LTD is valid for 30 days from the date of issue, unless otherwise stated. Quotes are subject to a site survey and may be revised following inspection.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">5. Intellectual Property</h2>
              <p>
                All content on this website — including but not limited to text, images, logos, and design — is the property of EBK Construction LTD or its licensors and is protected by UK copyright law.
              </p>
              <p className="mt-3">
                You may not reproduce, distribute, or use any content from this website for commercial purposes without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">6. Testimonials</h2>
              <p>
                By submitting a testimonial via our website, you grant EBK Construction LTD a non-exclusive, royalty-free licence to display your name, role, and review on this website and in our marketing materials.
              </p>
              <p className="mt-3">
                All testimonials are reviewed before publication. We reserve the right to decline or remove any submission at our discretion. You may request removal of your testimonial at any time by contacting us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-[#c8a96e] hover:underline">{SITE.email}</a>.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, EBK Construction LTD shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising from your use of this website or reliance on any information contained herein.
              </p>
              <p className="mt-3">
                We do not accept liability for any loss caused by technical issues, downtime, or errors on the website.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">8. Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">9. Privacy</h2>
              <p>
                Your use of this website is also governed by our{" "}
                <a href="/privacy-policy" className="text-[#c8a96e] hover:underline font-semibold">Privacy Policy</a>,
                which is incorporated into these Terms and Conditions by reference.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">10. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from your use of this website shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>

            <div>
              <h2 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-4">11. Changes to These Terms</h2>
              <p>
                We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Your continued use of the website after any changes constitutes your acceptance of the revised terms.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                For any questions about these Terms and Conditions, contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-[#c8a96e] hover:underline">{SITE.email}</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
