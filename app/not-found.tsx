import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center font-mono">
      <h2 className="text-4xl font-extrabold text-charcoal mb-2 font-display">404</h2>
      <p className="text-sm text-slate-600 mb-6">Page Not Found</p>
      <Link href="/" className="btn-tech btn-tech-primary text-xs">
        Return Home
      </Link>
    </div>
  );
}
