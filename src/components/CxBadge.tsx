type Props = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
};

export function CxBadge({ children, variant = "default" }: Props) {
  const styles: Record<string, string> = {
    default: "bg-black text-white",
    accent: "bg-[var(--cx-pink)] text-white",
    muted: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide " +
        styles[variant]
      }
    >
      {children}
    </span>
  );
}
