'use client';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call forgot-password API
    console.log('Password reset link sent to:', email);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/avatar.jpg')" }}>
        <div className="text-white m-8 text-xl font-bold">Decode deeper. <br /> Hit alpha.</div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-black text-white">
        <h2 className="text-2xl font-semibold mb-4">Forgot password?</h2>
        <p className="mb-6 text-sm">Let’s help you get back into your account. But first, let’s confirm your email.</p>
        <form onSubmit={handleSubmit} className="w-80 flex flex-col space-y-4">
          <input type="email" placeholder="Enter your registered email" className="p-2 rounded text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" className="bg-white text-black py-2 rounded">Send me a link</button>
        </form>
        <div className="mt-4">
          <a href="/sign-in" className="text-blue-400 underline text-sm">Go back to Log in</a>
        </div>
      </div>
    </div>
  );
}
