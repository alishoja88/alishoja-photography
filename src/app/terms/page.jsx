"use client";

export default function TermsOfService() {
  return (
    <div className="w-[90%] max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="space-y-8 text-white/80">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Copyright and Ownership</h2>
          <p>
            All photographs, images, and content on this website are protected by international 
            copyright laws and remain the property of Ali Shoja Photography.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Usage Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Images may not be used without explicit written permission</li>
            <li>Sharing on social media requires proper attribution</li>
            <li>Commercial use of any content is strictly prohibited without a license</li>
            <li>Modification of any images is not permitted</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">3. Photography Services</h2>
          <p>When booking our photography services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Booking requires a signed contract and deposit</li>
            <li>Cancellation policies apply as per contract terms</li>
            <li>Weather-related rescheduling policies apply</li>
            <li>Delivery timelines are specified in individual contracts</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Image Licensing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal use licenses do not transfer copyright</li>
            <li>Commercial licensing terms are negotiated separately</li>
            <li>Image modifications must be approved in writing</li>
            <li>Licensing terms are non-transferable</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">5. Website Usage</h2>
          <p>By using this website, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Not attempt to download or copy protected images</li>
            <li>Respect all copyright and intellectual property rights</li>
            <li>Not use any content for commercial purposes without permission</li>
            <li>Provide accurate information when contacting us</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">6. Contact</h2>
          <p>
            For any questions regarding these terms, please contact:
            Alishojaa88@gmail.com
          </p>
        </section>

        <p className="text-sm text-white/60 pt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}