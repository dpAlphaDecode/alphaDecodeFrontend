export default function ShippingAndDelivery() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Shipping & Delivery</h1>
        <p className="mb-4 text-gray-300">
          We ensure that all orders are delivered quickly and securely to your doorstep.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>We currently ship across all major cities in India.</li>
          <li>Orders are processed within 1-2 business days.</li>
          <li>Standard delivery takes 3–7 business days depending on location.</li>
          <li>You will receive a tracking link once your package has been dispatched.</li>
          <li>For any delivery-related issues, email us at delivery@alphadecode.in.</li>
        </ul>
      </div>
    </div>
  );
}
