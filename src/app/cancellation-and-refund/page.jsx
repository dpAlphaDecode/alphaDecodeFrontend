export default function CancellationAndRefund() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Cancellation & Refund Policy</h1>
        <p className="mb-4 text-gray-300">
          At AlphaDecode, we strive to provide the best experience for all our users. However, if you’re not satisfied with your purchase, here’s our policy:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Cancellations can be requested within 24 hours of placing the order.</li>
          <li>Refunds are processed within 7-10 business days to the original payment method.</li>
          <li>Digital or downloadable products are non-refundable once accessed.</li>
          <li>To initiate a cancellation or refund, email us at refund@alphadecode.in.</li>
        </ul>
      </div>
    </div>
  );
}
