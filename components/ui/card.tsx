import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("glass rounded-2xl p-6", className)}>{children}</div>;
}

export function Badge({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "amber" | "mist" }) {
  const tones = {
    cyan: "border-cyan/30 bg-cyan/10 text-cyan",
    amber: "border-amber/30 bg-amber/10 text-amber",
    mist: "border-white/10 bg-white/5 text-mist",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}
