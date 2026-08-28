"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 78, y: 42, label: "Evidence" },
  { x: 210, y: 28, label: "Entities" },
  { x: 320, y: 88, label: "Network" },
  { x: 118, y: 148, label: "Documents" },
  { x: 248, y: 176, label: "Timeline" },
  { x: 52, y: 96, label: "Secure" },
];

const links = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [1, 4],
  [5, 0],
  [5, 3],
  [2, 4],
];

export function IntelligenceVisual() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/10 bg-navy-900">
      <div className="grid-backdrop absolute inset-0 opacity-80" />
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan/15 blur-3xl" />
      <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full bg-signal/10 blur-3xl" />
      <svg viewBox="0 0 380 220" className="relative h-full w-full p-4" role="img" aria-label="Abstract visualisation of secure data intelligence and investigation relationships">
        {links.map(([from, to], index) => (
          <motion.line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="rgba(94,234,212,0.35)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.15 * index }}
          />
        ))}
        {nodes.map((node, index) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="16"
              fill="#111a2e"
              stroke="#5eead4"
              strokeWidth="1.4"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            />
            <circle cx={node.x} cy={node.y} r="3.5" fill="#7dd3fc">
              <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x={node.x} y={node.y + 32} textAnchor="middle" fill="#94a3b8" fontSize="9" letterSpacing="0.08em">
              {node.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wider text-mist">
        <div className="rounded-lg border border-white/10 bg-black/20 px-2 py-1.5">Encrypted channel</div>
        <div className="rounded-lg border border-white/10 bg-black/20 px-2 py-1.5">Evidence graph</div>
        <div className="rounded-lg border border-white/10 bg-black/20 px-2 py-1.5">Field + lab</div>
      </div>
    </div>
  );
}
