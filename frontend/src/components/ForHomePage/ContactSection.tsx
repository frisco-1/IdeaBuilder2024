import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-[#F3F4F6] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl">

          {/* Section Label */}
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-[#E9252E]">
            Get In Touch
          </p>

          <h2 className="mb-4 text-center text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Submit an Inquiry
          </h2>

          <p className="mb-12 text-center text-lg leading-relaxed text-gray-600">
            Didn’t find what you're looking for? Have questions? Submit an inquiry!
          </p>

          {/* Success Message */}
          {submitted ? (
            <div className="rounded-2xl border border-[#E9252E]/30 bg-[#E9252E]/10 px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E9252E]">
                <FaPaperPlane className="h-6 w-6 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Thank you!
              </h3>

              <p className="text-gray-600">
                We've received your inquiry and will get back to you shortly.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* First + Last Name */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-900">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                    type="submit"
                    className="mt-2 flex items-center gap-2 rounded-xl bg-[#E9252E] px-6 py-3 text-white font-semibold hover:bg-[#c81f27] transition"
                >
                    <FaPaperPlane className="h-4 w-4" />
                    Send Inquiry
                </button>
              </div>
              
            </form>
          )}
        </div>
      </div>
    </section>
  );
}