"use client";

export default function PrivacyPolicy() {
  return (
    <div className="w-[90%] max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-white/80">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Photography and Image Usage</h2>
          <p>
            All photographs on this website are protected by copyright and are the exclusive property 
            of Ali Shoja. Images may not be downloaded, copied, or used without explicit written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Personal Information Collection</h2>
          <p>
            We collect information when you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact us through our contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Request photography services</li>
            <li>Comment on or interact with our gallery</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">3. Use of Information</h2>
          <p>
            Information collected is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to your inquiries</li>
            <li>Process your requests for photography services</li>
            <li>Send newsletters and updates (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Image Rights and Usage</h2>
          <p>
            When we take photographs as part of our services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We retain copyright of all images</li>
            <li>Usage rights are specified in individual service agreements</li>
            <li>Images may be used in our portfolio unless otherwise agreed</li>
            <li>Client privacy and consent are always prioritized</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">5. Contact Information</h2>
          <p>
            For any privacy-related questions or concerns, please contact us at:
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