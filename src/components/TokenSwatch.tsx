import { CopyButton } from "./CopyButton";

type Props = {
  name: string;
  value: string;
  previewVar?: string;
};

export function TokenSwatch({ name, value, previewVar }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium tracking-tight text-black">{name}</div>
          <div className="mono mt-1 flex items-center text-xs text-gray-500">
            <span>{value}</span>
            <CopyButton text={value} />
          </div>
          {previewVar && (
            <div className="mono mt-0.5 flex items-center text-xs text-gray-500">
              <span>{previewVar}</span>
              <CopyButton text={`var(${previewVar})`} />
            </div>
          )}
        </div>
        <div
          className="h-10 w-10 shrink-0 rounded-md border border-gray-200"
          style={{ background: previewVar ? `var(${previewVar})` : value }}
          aria-label={`${name} swatch`}
        />
      </div>
    </div>
  );
}
