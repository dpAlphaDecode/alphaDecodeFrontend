// src/app/sign-in/page.jsx
'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white grid lg:grid-cols-2">
      {/* Left image (kept from your design) */}
      <div
        className="hidden lg:block bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: "url('/signup.png')" }}
        role="img"
        aria-label="DecodeAlpha trading platform preview"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
        <div className="absolute bottom-10 left-10 z-10">
          <h2 className="text-3xl lg:text-4xl font-bold drop-shadow-lg leading-tight">
            Decode deeper.<br />
            <span className="text-blue-400">Hit alpha.</span>
          </h2>
          <p className="text-gray-300 mt-2 text-lg drop-shadow">
            Advanced trading insights at your fingertips
          </p>
        </div>
      </div>

      {/* Clerk card */}
      <div className="flex items-center justify-center px-6 py-8 lg:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold">
              Decode<span className="text-blue-400">Alpha</span>
            </h1>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 shadow-2xl backdrop-blur-sm p-6">
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  card: 'bg-transparent shadow-none',
                  headerTitle: 'text-white',
                  headerSubtitle: 'text-gray-400',
                  formButtonPrimary:
                    'bg-blue-600 hover:bg-blue-700 text-white',
                  socialButtonsBlockButton:
                    'border-white/20 bg-neutral-900/50 hover:bg-neutral-800/50',
                  formFieldInput:
                    'bg-neutral-800/50 border-white/10 text-white placeholder:text-gray-400',
                },
                variables: {
                  colorPrimary: '#2563eb',
                  borderRadius: '0.75rem',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
