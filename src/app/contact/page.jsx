"use client";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import FormInput from "@/component/formInput/formInput";
import Button from "@/component/button/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Get in Touch
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white/80">
              <Mail className="w-5 h-5 text-purple-400" />
              <span className="text-base">alishoja88@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span className="text-base">NB, Canada</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-white mt-6 mb-4">
            Photography Services
          </h2>
          <p className="text-base text-white/80">
            Available for photography projects, collaborations, and special
            events. Feel free to reach out for:
          </p>
          <ul className="list-disc list-inside mt-3 text-base text-white/70 space-y-1">
            <li>Street Photography</li>
            <li>Nature Photography</li>
            <li>Event Coverage</li>
            <li>Personal Photoshoots</li>
          </ul>
        </div>

        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormInput
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />

            {status.message && (
              <div
                className={`p-4 rounded-lg text-base ${
                  status.type === "success"
                    ? "bg-green-500/20 text-green-200"
                    : "bg-red-500/20 text-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              width="100%"
              className="bg-[#7209B7] text-white rounded-lg hover:bg-[#B5179E]"
            >
              <Send className="w-5 h-5" /> <span>Send Message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
