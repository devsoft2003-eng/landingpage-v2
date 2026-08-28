import Link from "next/link";
import {
  Fingerprint,
  Search,
  Shield,
  Radio,
  BarChart3,
  Cpu,
} from "lucide-react";

const capabilities = [
  { icon: Search, label: "Digital Investigation" },
  { icon: Fingerprint, label: "Digital Forensics" },
  { icon: BarChart3, label: "Intelligence Analysis" },
  { icon: Shield, label: "Secure Systems" },
  { icon: Radio, label: "Field Operations" },
  { icon: Cpu, label: "Data Intelligence" },
];

export function CapabilityStrip() {
  return (
    <section className="border-y border-white/8 bg-navy-900/50" aria-label="Capabilities">
      <div className="container-shell grid grid-cols-2 gap-px bg-white/8 sm:grid-cols-3 lg:grid-cols-6">
        {capabilities.map((item) => (
          <Link
            key={item.label}
            href="/solutions"
            className="flex items-center gap-3 bg-navy-950 px-4 py-5 text-sm text-mist transition hover:bg-navy-800 hover:text-ice"
          >
            <item.icon className="h-4 w-4 text-cyan" aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
