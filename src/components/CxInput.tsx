type Props = {
  label: string;
  placeholder?: string;
  type?: string;
};

export function CxInput({ label, placeholder, type = "text" }: Props) {
  return (
    <label className="block">
      <span className="mono text-xs uppercase text-gray-400">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 transition focus:border-[var(--cx-pink)] focus:outline-none focus:ring-1 focus:ring-[var(--cx-pink)]"
      />
    </label>
  );
}
