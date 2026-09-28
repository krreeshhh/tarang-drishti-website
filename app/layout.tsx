import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TARANG DRISHTI — Helmet-Mounted Zero-Profile Conformal Dual-Band Antenna',
  description:
    'A helmet-integrated zero-profile conformal dual-band antenna designed for reliable RF performance in urban CQB environments. Smart India Hackathon 2026. Team Odyssey_.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
