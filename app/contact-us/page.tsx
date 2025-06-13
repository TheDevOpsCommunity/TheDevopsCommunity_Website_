"use client";

import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          type: 'general'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-4">
        We&apos;d love to hear from you! Whether you have a question about our
        webinars, courses, pricing, or anything else, our team is ready to
        answer all your questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
          <p className="mb-2">
            <strong>General Inquiries:</strong>
          </p>
          <p className="mb-4">
            Email: <a href="mailto:info@thedevopscommunity.com" className="text-blue-600 hover:underline">info@thedevopscommunity.com</a>
          </p>

          <p className="mb-2">
            <strong>Support:</strong>
          </p>
          <p className="mb-4">
            Email: <a href="mailto:frontdesk@thedevopscommunity.com" className="text-blue-600 hover:underline">frontdesk@thedevopscommunity.com</a>
          </p>

          <p className="mb-2">
            <strong>Business Hours:</strong>
          </p>
          <p className="mb-4">Monday - Friday, 9 AM - 5 PM (India Standard Time)</p>

          {/* Optional: Add physical address if applicable */}
          {/* <p className="mb-2">
            <strong>Address:</strong>
          </p>
          <p className="mb-4">[Your Company Address]</p> */}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Send Us a Message</h2>
          {submitted ? (
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg text-center border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Thank You!</h3>
              <p className="text-blue-700">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-blue-900">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-blue-900">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-blue-900">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-blue-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200 resize-none"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 