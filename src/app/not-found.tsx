import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p
        className="text-[8rem] font-bold leading-none"
        style={{ color: "var(--cx-pink)", opacity: 0.25 }}
      >
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2" style={{ color: "var(--cx-content-muted)" }}>
        The page you&apos;re looking for doesn&apos;t exist in the brand system.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors"
        style={{ background: "var(--cx-pink)" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
