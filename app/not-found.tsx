import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | Dakshesh B",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <p className="text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
        This page could not be found
      </h1>
      <p className="mt-3 max-w-prose text-lg text-ink-muted">
        The link may be broken or the page may have moved. Let us get you back
        on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home aria-hidden="true" className="h-4 w-4" />
          Go to homepage
        </Link>
        <Link href="/#products" className="btn-secondary">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          View products
        </Link>
      </div>
    </section>
  );
}
