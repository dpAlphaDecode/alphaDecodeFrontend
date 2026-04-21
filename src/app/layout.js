// src/app/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#2563eb',        // Blue primary color
          colorPrimaryHover: '#1d4ed8',   // Darker blue on hover
          colorBackground: '#000000',      // Pure black background
          colorInputBackground: '#1f1f1f', // Dark input backgrounds
          colorText: '#ffffff',           // White text
          colorTextSecondary: '#a1a1aa',  // Gray secondary text
          borderRadius: '0.75rem',        // Rounded corners
          spacingUnit: '1rem',           // Base spacing unit
        },
        elements: {
          // Main container styling
          rootBox: {
            backgroundColor: '#000000',
          },
          // Card/form styling
          card: {
            backgroundColor: '#111111',
            border: '1px solid #333333',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          },
          // Button styling
          formButtonPrimary: {
            backgroundColor: '#2563eb',
            '&:hover': {
              backgroundColor: '#1d4ed8',
            },
          },
          // Input field styling
          formFieldInput: {
            backgroundColor: '#1f1f1f',
            borderColor: '#333333',
            color: '#ffffff',
            '&:focus': {
              borderColor: '#2563eb',
            },
          },
          // Header styling
          headerTitle: {
            color: '#ffffff',
          },
          headerSubtitle: {
            color: '#a1a1aa',
          },
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="bg-black text-white min-h-screen antialiased">
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}