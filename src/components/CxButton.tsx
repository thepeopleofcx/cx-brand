import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
};

export function CxButton({ children, href, variant = "primary" }: Props) {
  const className =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition " +
    (variant === "primary"
      ? "bg-[var(--cx-fg)] text-[var(--cx-bg)] hover:opacity-90"
      : "border border-[var(--cx-border)] text-[var(--cx-fg)] hover:bg-white/5");

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}
