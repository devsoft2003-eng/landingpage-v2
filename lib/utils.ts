import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function formatDay(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function getClientIp(headers: Headers): string {
  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("true-client-ip"),
    headers.get("x-real-ip"),
    headers.get("x-client-ip"),
    headers.get("x-forwarded-for")?.split(",")[0],
  ];

  for (const value of candidates) {
    const ip = value?.trim();
    if (ip && ip !== "unknown") {
      return ip.replace(/^::ffff:/, "").slice(0, 64);
    }
  }

  return "unknown";
}

export function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}
