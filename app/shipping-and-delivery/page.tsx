export default function ShippingAndDelivery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping and Delivery</h1>

      <p className="mb-4">
        Since we&apos;re dealing with digital products (webinars and courses),
        there&apos;s no physical shipping involved. Here&apos;s how you&apos;ll
        receive your purchased content:
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Digital Delivery</h2>
          <p className="mb-2">
            Upon successful purchase, you&apos;ll receive:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Immediate access to your purchased content through your account</li>
            <li>A confirmation email with access instructions</li>
            <li>Any additional materials or resources included with your purchase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Access Timeframe</h2>
          <p className="mb-2">
            For webinars:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Live webinars: Access details will be sent 24 hours before the scheduled time</li>
            <li>Recorded webinars: Immediate access after purchase</li>
          </ul>

          <p className="mb-2">
            For courses:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Full access to all course materials immediately after purchase</li>
            <li>Access duration as specified in the course details</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Technical Requirements</h2>
          <p className="mb-4">
            To ensure smooth access to your purchased content, please make sure you have:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>A stable internet connection</li>
            <li>An up-to-date web browser</li>
            <li>Required software or plugins (if specified in the course details)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Customer Support</h2>
          <p className="mb-4">
            If you experience any issues accessing your purchased content, please contact our support team at <a href="mailto:[Your Support Email]" className="text-blue-600 hover:underline">[Your Support Email]</a>. We&apos;re here to help ensure you have a smooth learning experience.
          </p>
        </section>
      </div>
    </div>
  );
} 