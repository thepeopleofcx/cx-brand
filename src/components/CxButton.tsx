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
      ? "bg-black text-white hover:bg-gray-800"
      : "border border-gray-300 text-black hover:border-[var(--cx-pink)] hover:text-[var(--cx-pink)]");

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}
