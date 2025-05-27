export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-4">
        We'd love to hear from you! Whether you have a question about our
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
            Email: <a href="mailto:[Your General Email Address]" className="text-blue-600 hover:underline">[Your General Email Address]</a>
          </p>

          <p className="mb-2">
            <strong>Support:</strong>
          </p>
          <p className="mb-4">
            Email: <a href="mailto:[Your Support Email Address]" className="text-blue-600 hover:underline">[Your Support Email Address]</a>
          </p>

          <p className="mb-2">
            <strong>Business Hours:</strong>
          </p>
          <p className="mb-4">[Your Business Hours, e.g., Monday - Friday, 9 AM - 5 PM (Your Timezone)]</p>

          {/* Optional: Add physical address if applicable */}
          {/* <p className="mb-2">
            <strong>Address:</strong>
          </p>
          <p className="mb-4">[Your Company Address]</p> */}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Send Us a Message</h2>
          <form action="#" method="POST"> {/* Replace # with your form handling endpoint */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" name="subject" id="subject" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea name="message" id="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 